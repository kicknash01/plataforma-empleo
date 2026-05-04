import React from 'react';
import { useAuthStore } from '../../stores/auth-store';
import type { Conversacion } from '../../schemas/mensajeSchema';

interface ChatConversationListProps {
  conversaciones: Conversacion[];
  isLoading: boolean;
  onSelectConversacion: (conversacion: Conversacion) => void;
  formatFecha: (fecha: Date) => string;
}

export const ChatConversationList: React.FC<ChatConversationListProps> = ({
  conversaciones,
  isLoading,
  onSelectConversacion,
  formatFecha,
}) => {
  const { user } = useAuthStore();

  if (isLoading) {
    return <div className="chat-drawer-loading">Cargando...</div>;
  }

  if (conversaciones.length === 0) {
    return (
      <div className="chat-drawer-empty">
        <p>No hay conversaciones</p>
      </div>
    );
  }

  return (
    <div className="chat-drawer-conversations">
      {conversaciones.map((conv) => (
        <div
          key={conv.id}
          className="chat-drawer-conversation-item"
          onClick={() => onSelectConversacion(conv)}
        >
          <div className="chat-drawer-avatar">
            {user?.rol === 'candidato' ? conv.empresaNombre[0] : conv.candidatoNombre[0]}
          </div>
          <div className="chat-drawer-conversation-info">
            <div className="chat-drawer-conversation-header">
              <h4>{user?.rol === 'candidato' ? conv.empresaNombre : conv.candidatoNombre}</h4>
              <span className="chat-drawer-time">{formatFecha(conv.ultimoMensajeFecha)}</span>
            </div>
            <p className="chat-drawer-preview">{conv.ultimoMensaje}</p>
          </div>
          {conv.mensajesNoLeidos > 0 && (
            <div className="chat-drawer-badge">{conv.mensajesNoLeidos}</div>
          )}
        </div>
      ))}
    </div>
  );
};
