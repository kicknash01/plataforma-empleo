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
  if (user.rol === 'candidato') {
    return <DashboardCandidato />;
  }

  if (user.rol === 'empresa') {
    return <DashboardEmpresa />;
  }

  return <div>Rol no reconocido</div>;
};

export default DashboardRouter;
