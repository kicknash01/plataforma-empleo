import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthTemplate } from '../templates/AuthTemplate';
import { InputField } from '../molecules/InputField';
import { Button } from '../atoms/Button';
import { ErrorAlert } from '../molecules/ErrorAlert';
import { authService } from '../../services/auth-service';
import '../../css/pages/Recuperacion.css';

const SolicitarRecuperacionPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const validateEmail = (value: string) => {
    if (!value) {
      setEmailError('El email es requerido');
    } else if (!value.includes('@')) {
      setEmailError('Email inválido');
    } else {
      setEmailError('');
    }
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    validateEmail(email);

    if (emailError || !email) return;

    setIsLoading(true);
    setServerError(null);

    try {
      await authService.solicitarRecuperacion(email);
      setSuccess(true);
    } catch (err) {
      setServerError(err instanceof Error ? err.message : 'Error al solicitar recuperación');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthTemplate title="Recuperar contraseña" subtitle="Te enviaremos un enlace a tu email">
      {!success ? (
        <form onSubmit={handleSubmit}>
          <ErrorAlert message={serverError} onClose={() => setServerError(null)} />

          <InputField
            label="📧 Correo electrónico"
            type="email"
            placeholder="tu@email.com"
            value={email}
            onChange={(value) => {
              setEmail(value);
              validateEmail(value);
            }}
            onBlur={() => validateEmail(email)}
            error={emailError}
          />

          <Button type="submit" disabled={isLoading} variant="primary">
            {isLoading ? 'Enviando...' : 'Enviar enlace de recuperación'}
          </Button>
        </form>
      ) : (
        <div className="recuperacion-success">
          <span>✅</span>
          <p>¡Revisa tu email!</p>
          <p className="recuperacion-subtext">Te enviamos un enlace para restablecer tu contraseña.</p>
          <button onClick={() => navigate('/login')} className="recuperacion-button">
            Volver al inicio de sesión
          </button>
        </div>
      )}

      <div className="recuperacion-link">
        <button onClick={() => navigate('/login')} className="recuperacion-back-button">
          ← Volver al inicio de sesión
        </button>
      </div>
    </AuthTemplate>
  );
};

export default SolicitarRecuperacionPage;
