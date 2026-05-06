import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AuthTemplate } from '../templates/AuthTemplate';
import { PasswordInput } from '../molecules/PasswordInput';
import { Button } from '../atoms/Button';
import { ErrorAlert } from '../molecules/ErrorAlert';
import { authService } from '../../services/auth-service';
import '../../css/pages/Recuperacion.css';

const ResetearPasswordPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmError, setConfirmError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const validatePassword = (value: string) => {
    if (!value) {
      setPasswordError('La contraseña es requerida');
    } else if (value.length < 6) {
      setPasswordError('Mínimo 6 caracteres');
    } else {
      setPasswordError('');
    }
  };

  const validateConfirm = (value: string) => {
    if (value !== password) {
      setConfirmError('Las contraseñas no coinciden');
    } else {
      setConfirmError('');
    }
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (!token) {
      setServerError('Token inválido o expirado');
      return;
    }

    validatePassword(password);
    validateConfirm(confirmPassword);

    if (passwordError || confirmError || !password || !confirmPassword) return;

    setIsLoading(true);
    setServerError(null);

    try {
      await authService.resetearPassword(token, password);
      setSuccess(true);
    } catch (err) {
      setServerError(err instanceof Error ? err.message : 'Error al restablecer contraseña');
    } finally {
      setIsLoading(false);
    }
  };

  // Si no hay token y no estamos en éxito, mostrar error
  if (!token && !success) {
    return (
      <AuthTemplate title="Restablecer contraseña" subtitle="Token inválido">
        <div className="resetear-error">
          <span>❌</span>
          <p>Token inválido o expirado</p>
          <button onClick={() => navigate('/solicitar-recuperacion')} className="resetear-button">
            Solicitar nuevo enlace
          </button>
        </div>
      </AuthTemplate>
    );
  }

  return (
    <AuthTemplate title="Restablecer contraseña" subtitle="Ingresa tu nueva contraseña">
      {!success ? (
        <form onSubmit={handleSubmit}>
          <ErrorAlert message={serverError} onClose={() => setServerError(null)} />

          <PasswordInput
            value={password}
            onChange={(value) => {
              setPassword(value);
              validatePassword(value);
              if (confirmPassword) validateConfirm(confirmPassword);
            }}
            onBlur={() => validatePassword(password)}
            error={passwordError}
          />

          <PasswordInput
            value={confirmPassword}
            onChange={(value) => {
              setConfirmPassword(value);
              validateConfirm(value);
            }}
            onBlur={() => validateConfirm(confirmPassword)}
            error={confirmError}
          />

          <Button type="submit" disabled={isLoading} variant="primary">
            {isLoading ? 'Restableciendo...' : 'Restablecer contraseña'}
          </Button>
        </form>
      ) : (
        <div className="resetear-success">
          <span>✅</span>
          <p>¡Contraseña restablecida correctamente!</p>
          <p className="resetear-subtext">Ahora puedes iniciar sesión con tu nueva contraseña.</p>
          <button onClick={() => navigate('/login')} className="resetear-button">
            Ir al inicio de sesión
          </button>
        </div>
      )}
    </AuthTemplate>
  );
};

export default ResetearPasswordPage;
