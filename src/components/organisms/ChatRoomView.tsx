import React, { useRef, useEffect } from 'react';
import { useAuthStore } from '../../stores/auth-store';
import { ChatMessage } from '../molecules/ChatMessage';
import { ChatInput } from '../molecules/ChatInput';
import type { Conversacion, Mensaje } from '../../schemas/mensajeSchema';

interface ChatRoomViewProps {
  conversacionActiva: Conversacion | null;
  mensajesActuales: Mensaje[];
  isLoadingMensajes: boolean;
  onBack: () => void;
  onEnviarMensaje: (contenido: string) => void;
}

export const ChatRoomView: React.FC<ChatRoomViewProps> = ({
  conversacionActiva,
  mensajesActuales,
  isLoadingMensajes,
  onBack,
  onEnviarMensaje,
}) => {
  const { user } = useAuthStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [mensajesActuales]);

  if (!conversacionActiva) return null;

  return (
    <div className="chat-drawer-room">
      <div className="chat-drawer-room-header">
        <button className="chat-drawer-back" onClick={onBack}>
          ←
        </button>
        <h4>
          {user?.rol === 'candidato' ? conversacionActiva.empresaNombre : conversacionActiva.candidatoNombre}
        </h4>
      </div>
      <div className="chat-drawer-messages">
        {isLoadingMensajes ? (
          <div className="chat-drawer-loading">Cargando mensajes...</div>
        ) : (
          mensajesActuales.map((mensaje) => (
            <ChatMessage
              key={mensaje.id}
              mensaje={mensaje}
              esPropio={mensaje.emisorId === user?.id}
            />
          ))
        )}
        <div ref={messagesEndRef} />
      </div>
      <ChatInput onEnviar={onEnviarMensaje} />
    </div>
  );
};
