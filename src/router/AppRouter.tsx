import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../components/pages/LoginPage';  // ← NUEVO
import RegistroSelectorPage from '../components/pages/RegistroSelectorPage';  // ← NUEVO
import RegisterCandidatoPage from '../components/pages/RegisterCandidatoPage';
import RegisterEmpresaPage from '../components/pages/RegisterEmpresaPage';
import EditarPerfilCandidato from '../components/pages/EditarPerfilCandidato';
import EditarPerfilEmpresa from '../components/pages/EditarPerfilEmpresa';
import DashboardRouter from '../components/DashboardRouter';
import { useAuthStore } from '../stores/auth-store';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuthStore();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

export const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta principal - Selector de rol (redirige al login) */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Login unificado */}
        <Route path="/login" element={<LoginPage />} />

        {/* Selección de rol para registro */}
        <Route path="/registro/seleccionar" element={<RegistroSelectorPage />} />

        {/* Rutas de registro */}
        <Route path="/registro/candidato" element={<RegisterCandidatoPage />} />
        <Route path="/registro/empresa" element={<RegisterEmpresaPage />} />

        {/* Rutas de editar perfil */}
        <Route path="/editar-perfil/candidato" element={
          <ProtectedRoute>
            <EditarPerfilCandidato />
          </ProtectedRoute>
        } />
        <Route path="/editar-perfil/empresa" element={
          <ProtectedRoute>
            <EditarPerfilEmpresa />
          </ProtectedRoute>
        } />

        {/* Ruta protegida del dashboard */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <DashboardRouter />
          </ProtectedRoute>
        } />

        {/* Redirección para rutas no encontradas */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
};
