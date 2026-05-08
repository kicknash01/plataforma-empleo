import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../components/pages/LoginPage';
import RegistroSelectorPage from '../components/pages/RegistroSelectorPage';
import RegisterCandidatoPage from '../components/pages/RegisterCandidatoPage';
import RegisterEmpresaPage from '../components/pages/RegisterEmpresaPage';
import VerificarEmailPage from '../components/pages/VerificarEmailPage';
import SolicitarRecuperacionPage from '../components/pages/SolicitarRecuperacionPage';
import ResetearPasswordPage from '../components/pages/ResetearPasswordPage';
import EditarPerfilCandidato from '../components/pages/EditarPerfilCandidato';
import EditarPerfilEmpresa from '../components/pages/EditarPerfilEmpresa';
import DashboardRouter from '../components/DashboardRouter';
import OfertasDisponiblesPage from '../components/pages/OfertasDisponiblesPage';
import DetalleOfertaPage from '../components/pages/DetalleOfertaPage';
import CrearOfertaPage from '../components/pages/CrearOfertaPage';
import MisOfertasPage from '../components/pages/MisOfertasPage';
import EditarOfertaPage from '../components/pages/EditarOfertaPage';
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
        {/* Ruta principal */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Login */}
        <Route path="/login" element={<LoginPage />} />

        {/* Registro */}
        <Route path="/registro/seleccionar" element={<RegistroSelectorPage />} />
        <Route path="/registro/candidato" element={<RegisterCandidatoPage />} />
        <Route path="/registro/empresa" element={<RegisterEmpresaPage />} />

        {/* Verificación email */}
        <Route path="/verificar-email" element={<VerificarEmailPage />} />

        {/* Recuperación contraseña */}
        <Route path="/solicitar-recuperacion" element={<SolicitarRecuperacionPage />} />
        <Route path="/resetear-password" element={<ResetearPasswordPage />} />

        {/* Editar perfil */}
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

        {/* ========== OFERTAS ========== */}
        <Route path="/ofertas" element={
          <ProtectedRoute>
            <OfertasDisponiblesPage />
          </ProtectedRoute>
        } />
        <Route path="/oferta/:id" element={
          <ProtectedRoute>
            <DetalleOfertaPage />
          </ProtectedRoute>
        } />
        <Route path="/crear-oferta" element={
          <ProtectedRoute>
            <CrearOfertaPage />
          </ProtectedRoute>
        } />
        <Route path="/mis-ofertas" element={
          <ProtectedRoute>
            <MisOfertasPage />
          </ProtectedRoute>
        } />
        <Route path="/editar-oferta/:id" element={
          <ProtectedRoute>
            <EditarOfertaPage />
          </ProtectedRoute>
        } />

        {/* Dashboard */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <DashboardRouter />
          </ProtectedRoute>
        } />

        {/* 404 */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
};
