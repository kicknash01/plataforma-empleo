import React, { useEffect, useState } from 'react';
import { useAuthStore } from '../../stores/auth-store';
import { useChatStore } from '../../stores/chatStore';
import { ChatDrawerHeader } from '../molecules/ChatDrawerHeader';
import { ChatDrawerSearch } from '../molecules/ChatDrawerSearch';
import { ChatDrawerTabs } from '../molecules/ChatDrawerTabs';
import { ChatConversationList } from './ChatConversationList';
import { ChatRoomView } from './ChatRoomView';
import '../../css/pages/ChatDrawer.css';

interface ChatDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChatDrawer: React.FC<ChatDrawerProps> = ({ isOpen, onClose }) => {
  const { user } = useAuthStore();
  const {
    conversaciones,
    mensajesActuales,
    isLoading,
    isLoadingMensajes,
    conversacionActiva,
    seleccionarConversacion,
    cargarConversaciones,
    cargarMensajes,
    enviarMensaje,
  } = useChatStore();

  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'todos' | 'noLeidos'>('todos');

  useEffect(() => {
    if (isOpen && user) {
      cargarConversaciones(user.id, user.rol);
    }
  }, [isOpen, user, cargarConversaciones]);

  useEffect(() => {
    if (conversacionActiva) {
      cargarMensajes(conversacionActiva.id);
    }
  }, [conversacionActiva, cargarMensajes]);

  const formatFecha = (fecha: Date) => {
    const hoy = new Date();
    const ayer = new Date(hoy);
    ayer.setDate(ayer.getDate() - 1);

    if (fecha.toDateString() === hoy.toDateString()) {
      return new Date(fecha).toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' });
    } else if (fecha.toDateString() === ayer.toDateString()) {
      return 'Ayer';
    } else {
      return new Date(fecha).toLocaleDateString('es-CL');
    }
  };

  const conversacionesFiltradas = conversaciones.filter((conv) => {
    const nombre = user?.rol === 'candidato' ? conv.empresaNombre : conv.candidatoNombre;
    const matchesSearch = nombre.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'todos' || (filter === 'noLeidos' && conv.mensajesNoLeidos > 0);
    return matchesSearch && matchesFilter;
  });

  const totalNoLeidos = conversaciones.reduce((sum, conv) => sum + conv.mensajesNoLeidos, 0);

  const handleEnviarMensaje = (contenido: string) => {
    if (!user || !conversacionActiva) return;

    enviarMensaje({
      conversacionId: conversacionActiva.id,
      emisorId: user.id,
      emisorNombre: user.nombre,
      emisorRol: user.rol,
      contenido,
      leido: false,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="chat-drawer-overlay" onClick={onClose}>
      <div className="chat-drawer" onClick={(e) => e.stopPropagation()}>
        <ChatDrawerHeader onClose={onClose} />
        <ChatDrawerSearch searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        <ChatDrawerTabs filter={filter} onFilterChange={setFilter} totalNoLeidos={totalNoLeidos} />

        <div className="chat-drawer-content">
          {!conversacionActiva ? (
            <ChatConversationList
              conversaciones={conversacionesFiltradas}
              isLoading={isLoading}
              onSelectConversacion={seleccionarConversacion}
              formatFecha={formatFecha}
            />
          ) : (
            <ChatRoomView
              conversacionActiva={conversacionActiva}
              mensajesActuales={mensajesActuales}
              isLoadingMensajes={isLoadingMensajes}
              onBack={() => seleccionarConversacion(null)}
              onEnviarMensaje={handleEnviarMensaje}
            />
          )}
        </div>
      </div>
    </div>
  );
};
