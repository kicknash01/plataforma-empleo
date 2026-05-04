import React, { useState } from 'react';
import { Button } from '../atoms/Button';

interface ChatInputProps {
  onEnviar: (mensaje: string) => void;
  disabled?: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onEnviar, disabled = false }) => {
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (mensaje.trim() && !disabled) {
      onEnviar(mensaje.trim());
      setMensaje('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="chat-input-form">
      <input
        type="text"
        value={mensaje}
        onChange={(e) => setMensaje(e.target.value)}
        placeholder="Escribe un mensaje..."
        className="chat-input-field"
        disabled={disabled}
      />
      <Button type="submit" variant="primary" disabled={disabled || !mensaje.trim()}>
        Enviar
      </Button>
    </form>
  );
};
