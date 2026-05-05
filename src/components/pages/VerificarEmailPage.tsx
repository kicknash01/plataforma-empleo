import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AuthTemplate } from '../templates/AuthTemplate';
import { authService } from '../../services/auth-service';
import { useAuthStore } from '../../stores/auth-store';
import '../../css/pages/VerificarEmailPage.css';

const VerificarEmailPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user, setUser } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const token = searchParams.get('token');

  useEffect(() => {
    const verificarEmail = async () => {
      if (!token) {
        setError('Token de verificación no válido');
        setIsLoading(false);
        return;
      }

      try {
        await authService.verificarEmail(token);

        setSuccess(true);

        if (user) {
          setUser({ ...user, email_verificado: true });
        }

        setTimeout(() => {
          navigate('/dashboard');
        }, 3000);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al verificar email');
      } finally {
        setIsLoading(false);
      }
    };

    verificarEmail();
  }, [token, navigate, user, setUser]);

  return (
    <AuthTemplate title="Verificar Email" subtitle="Confirmando tu cuenta">
      <div className="verificar-email-container">
        {isLoading && (
          <div className="verificar-loading">
            <div className="spinner"></div>
            <p>Verificando tu email...</p>
          </div>
        )}

        {error && (
          <div className="verificar-error">
            <span>❌</span>
            <p>{error}</p>
            <button onClick={() => navigate('/login')} className="verificar-button">
              Volver al inicio
            </button>
          </div>
        )}

        {success && (
          <div className="verificar-success">
            <span>✅</span>
            <p>¡Email verificado correctamente!</p>
            <p className="verificar-subtext">Serás redirigido al dashboard en unos segundos...</p>
            <button onClick={() => navigate('/dashboard')} className="verificar-button">
              Ir al dashboard ahora
            </button>
          </div>
        )}
      </div>
    </AuthTemplate>
  );
};

export default VerificarEmailPage;
