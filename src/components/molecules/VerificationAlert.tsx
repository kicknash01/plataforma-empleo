import React from 'react';
import '../../css/molecules/VerificationAlert.css';

interface VerificationAlertProps {
  onResend: () => void;
  isResending?: boolean;
}

export const VerificationAlert: React.FC<VerificationAlertProps> = ({
  onResend,
  isResending = false,
}) => {
  return (
    <div className="verification-alert">
      <div className="verification-alert-icon">⚠️</div>
      <div className="verification-alert-content">
        <h4>Email no verificado</h4>
        <p>Por favor verifica tu email para acceder a todas las funciones.</p>
      </div>
      <button
        onClick={onResend}
        disabled={isResending}
        className="verification-alert-button"
      >
        {isResending ? 'Enviando...' : 'Reenviar verificación'}
      </button>
    </div>
  );
};
