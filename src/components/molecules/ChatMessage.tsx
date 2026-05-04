import React from 'react';
import type { Mensaje } from '../../schemas/mensajeSchema';

interface ChatMessageProps {
  mensaje: Mensaje;
  esPropio: boolean;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ mensaje, esPropio }) => {
  const formatHora = (fecha: Date) => {
    return new Date(fecha).toLocaleTimeString('es-CL', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className={`chat-message ${esPropio ? 'propio' : 'otro'}`}>
      <div className="chat-message-bubble">
        <p className="chat-message-text">{mensaje.contenido}</p>
        <span className="chat-message-time">{formatHora(mensaje.fecha)}</span>
      </div>
    </div>
  );
};
