import React, { useState } from 'react';
import { useAuthStore } from '../stores/auth-store';
import { authService } from '../services/auth-service';
import { VerificationAlert } from '../components/molecules/VerificationAlert';
import DashboardCandidato from './pages/DashboardCandidato';
import DashboardEmpresa from './pages/DashboardEmpresa';
import '../css/molecules/VerificationAlert.css';

const DashboardRouter: React.FC = () => {
  const { user } = useAuthStore();
  const [isResending, setIsResending] = useState(false);

  const handleResendVerification = async () => {
    if (!user) return;

    setIsResending(true);
    try {
      await authService.reenviarVerificacion(user.email);
      alert('Email de verificación reenviado. Revisa tu bandeja de entrada.');
    } catch {
      alert('Error al reenviar la verificación');
    } finally {
      setIsResending(false);
    }
  };

  if (!user) {
    return <div>Cargando...</div>;
  }

  // Mostrar alerta de verificación si el email no está verificado
  const showVerificationAlert = user && !user.email_verificado;

  // Elegir qué dashboard mostrar según el rol
  const DashboardComponent = user.rol === 'candidato' ? DashboardCandidato : DashboardEmpresa;

  return (
    <>
      {showVerificationAlert && (
        <div className="dashboard-container">
          <VerificationAlert
            onResend={handleResendVerification}
            isResending={isResending}
          />
        </div>
      )}
      <DashboardComponent />
    </>
  );
};

export default DashboardRouter;
