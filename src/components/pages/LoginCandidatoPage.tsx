import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthTemplate } from '../templates/AuthTemplate';
import { LoginForm } from '../organisms/LoginForm';
import { useAuthStore } from '../../stores/auth-store';
import { authService } from '../../services/auth-service';
import '../../css/pages/LoginCandidatoPage.css';

const LoginCandidatoPage: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const { setUser, setAccessToken } = useAuthStore();

  const handleLogin = async (email: string, password: string) => {
    setIsLoading(true);
    setServerError(null);

    try {
      const response = await authService.loginCandidato({ email, password });
      setUser(response.user);
      setAccessToken(response.access_token);
      navigate('/dashboard');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setServerError(err.message);
      } else {
        setServerError('Ocurrió un error desconocido');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearError = () => {
    setServerError(null);
  };

  return (
    <AuthTemplate title="Login Candidato" subtitle="Ingresa a tu cuenta para buscar empleo">
      <LoginForm
        onSubmit={handleLogin}
        isLoading={isLoading}
        serverError={serverError}
        onClearError={handleClearError}
        variant="candidato"
      />
      <div className="login-register-link">
        <button
          onClick={() => navigate('/registro/candidato')}
          className="login-register-button"
        >
          ¿No tienes cuenta? Regístrate
        </button>
      </div>
    </AuthTemplate>
  );
};

export default LoginCandidatoPage;
