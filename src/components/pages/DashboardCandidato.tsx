import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/auth-store';
import { useChatStore } from '../../stores/chatStore';
import { ChatFloatingButton } from '../molecules/ChatFloatingButton';
import { ChatDrawer } from '../organisms/ChatDrawer';
import '../../css/pages/DashboardCandidato.css';
import { authService } from '../../services/auth-service';

const DashboardCandidato: React.FC = () => {
  const navigate = useNavigate();
  const { user, clearUser } = useAuthStore();
  const { conversaciones } = useChatStore();
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Calcular mensajes no leídos totales
  const totalNoLeidos = conversaciones.reduce((sum, conv) => sum + conv.mensajesNoLeidos, 0);

  if (!user) {
    return <div>Cargando...</div>;
  }

  const logout = async () => {
    await authService.logout(); // POST /auth/logout que destruye la sesión/refresco
    clearUser();
    navigate('/login');
  };

  return (
    <div className="dashboard-candidato">
      {/* Header */}
      <header className="dashboard-header">
        <h1>Plataforma de Empleo</h1>
        <div className="header-buttons">
          <button
            onClick={() => navigate('/editar-perfil/candidato')}
            className="edit-profile-btn"
          >
            ✏️ Editar perfil
          </button>
          <button onClick={logout} className="logout-btn">
            Cerrar sesión
          </button>
        </div>
      </header>

      {/* Bienvenida */}
      <div className="welcome-section">
        <h2>¡Bienvenido, {user.nombre}! 🎉</h2>
        <p>Email: {user.email}</p>
        <p>Estado: {user.email_verificado ? '✅ Email verificado' : '⚠️ Email no verificado'}</p>
      </div>

      {/* Estadísticas */}
      <div className="stats-section">
        <div className="stat-card">
          <h3>📄 Ofertas aplicadas</h3>
          <p className="stat-number">0</p>
          <p>Todavía no has aplicado a ninguna oferta</p>
        </div>
        <div className="stat-card">
          <h3>👀 Ofertas vistas</h3>
          <p className="stat-number">0</p>
          <p>Explora nuevas oportunidades</p>
        </div>
        <div className="stat-card">
          <h3>⭐ Perfil completado</h3>
          <p className="stat-number">60%</p>
          <p>Completa tu perfil para más oportunidades</p>
        </div>
      </div>

      {/* Ofertas destacadas */}
      <div className="jobs-section">
        <h3>📌 Ofertas destacadas</h3>
        <div className="jobs-list">
          <div className="job-card">
            <h4>Desarrollador React Junior</h4>
            <p>Empresa Tech S.A. • Remoto</p>
            <span className="job-salary">💰 $1200 - $1500</span>
            <button className="job-btn">Ver detalles</button>
          </div>
          <div className="job-card">
            <h4>Frontend Developer</h4>
            <p>Digital Agency • Híbrido</p>
            <span className="job-salary">💰 $1400 - $1800</span>
            <button className="job-btn">Ver detalles</button>
          </div>
          <div className="job-card">
            <h4>Full Stack JavaScript</h4>
            <p>Startup Innovadora • Remoto</p>
            <span className="job-salary">💰 $2000 - $2500</span>
            <button className="job-btn">Ver detalles</button>
          </div>
        </div>
      </div>

      {/* Chat flotante */}
      <ChatFloatingButton onClick={() => setIsChatOpen(true)} unreadCount={totalNoLeidos} />
      <ChatDrawer isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  );
};

export default DashboardCandidato;
