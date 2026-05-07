import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthTemplate } from '../templates/AuthTemplate';
import { LoginForm } from '../organisms/LoginForm';
import { useAuthStore } from '../../stores/auth-store';
import { authService } from '../../services/auth-service';
import '../../css/pages/LoginPage.css';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const { setUser, setAccessToken } = useAuthStore();



  const handleLogin = async (email: string, password: string) => {
    setIsLoading(true);
    setServerError(null);

    try {
      const response = await authService.login({ email, password });
      setUser(response.user);
      setAccessToken(response.message);
      navigate('/dashboard');
    } catch (err) {
      if (err instanceof Error) {
        setServerError(err.message);
      } else {
        setServerError('Ocurrió un error desconocido');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearError = () => setServerError(null);

  return (
    <AuthTemplate title="Iniciar Sesión" subtitle="Ingresa a tu cuenta">
      <LoginForm
        onSubmit={handleLogin}
        isLoading={isLoading}
        serverError={serverError}
        onClearError={handleClearError}
      />
      <div className="login-register-link">
        <button
          onClick={() => navigate('/registro/seleccionar')}
          className="login-register-button"
        >
          ¿No tienes cuenta? Regístrate
        </button>
      </div>
    </AuthTemplate>
  );
};

export default LoginPage;
