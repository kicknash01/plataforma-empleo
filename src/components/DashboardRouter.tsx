import React from 'react';
import { useAuthStore } from '../stores/auth-store';
import DashboardCandidato from './pages/DashboardCandidato';
import DashboardEmpresa from './pages/DashboardEmpresa';

const DashboardRouter: React.FC = () => {
  const { user } = useAuthStore();

  if (!user) {
    return <div>Cargando...</div>;
  }

  // Mostrar dashboard según el rol del usuario
  if (user.role === 'USER') {
    return <DashboardCandidato />;
  }

  if (user.role === 'COMPANY') {
    return <DashboardEmpresa />;
  }

  return <div>Rol no reconocido</div>;
};

export default DashboardRouter;
