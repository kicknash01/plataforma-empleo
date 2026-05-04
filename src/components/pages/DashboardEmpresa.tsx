import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/auth-store';
import { useChatStore } from '../../stores/chatStore';
import { ChatFloatingButton } from '../molecules/ChatFloatingButton';
import { ChatDrawer } from '../organisms/ChatDrawer';
import '../../css/pages/DashboardEmpresa.css';

const DashboardEmpresa: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const { conversaciones } = useChatStore();
  const [isChatOpen, setIsChatOpen] = useState(false);

  const totalNoLeidos = conversaciones.reduce((sum, conv) => sum + conv.mensajesNoLeidos, 0);

  if (!user) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="dashboard-empresa">
      <header className="dashboard-header">
        <h1>Plataforma de Empleo</h1>
        <div className="header-buttons">
          <button
            onClick={() => navigate('/editar-perfil/empresa')}
            className="edit-profile-btn"
          >
            ✏️ Editar perfil
          </button>
          <button onClick={logout} className="logout-btn">
            Cerrar sesión
          </button>
        </div>
      </header>

      <div className="welcome-section">
        <h2>¡Bienvenido, {user.nombre}! 🏢</h2>
        <p>Email: {user.email}</p>
        <p>Estado: {user.email_verificado ? '✅ Email verificado' : '⚠️ Email no verificado'}</p>
      </div>

      <div className="stats-section">
        <div className="stat-card">
          <h3>📊 Ofertas publicadas</h3>
          <p className="stat-number">0</p>
          <p>Aún no has publicado ninguna oferta</p>
        </div>
        <div className="stat-card">
          <h3>👥 Postulantes</h3>
          <p className="stat-number">0</p>
          <p>Postulantes a tus ofertas</p>
        </div>
        <div className="stat-card">
          <h3>👁️ Visitas a tu perfil</h3>
          <p className="stat-number">0</p>
          <p>Candidatos que han visto tu empresa</p>
        </div>
      </div>

      <div className="create-offer-section">
        <button className="create-offer-btn">➕ Crear nueva oferta</button>
      </div>

      <div className="offers-section">
        <h3>📋 Mis ofertas publicadas</h3>
        <div className="offers-list">
          <div className="offer-card">
            <h4>Desarrollador React Junior</h4>
            <p>Publicada: 01/04/2025</p>
            <span className="offer-status active">Activa</span>
            <div className="offer-actions">
              <button className="offer-btn edit">✏️ Editar</button>
              <button className="offer-btn delete">🗑️ Eliminar</button>
              <button className="offer-btn view">👥 Ver postulantes (0)</button>
            </div>
          </div>
          <div className="offer-card empty">
            <p>No tienes ofertas publicadas</p>
            <button className="create-offer-small">+ Crear primera oferta</button>
          </div>
        </div>
      </div>

      <ChatFloatingButton onClick={() => setIsChatOpen(true)} unreadCount={totalNoLeidos} />
      <ChatDrawer isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  );
};

export default DashboardEmpresa;
