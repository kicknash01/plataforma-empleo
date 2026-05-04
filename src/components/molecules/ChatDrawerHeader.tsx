import React from 'react';

interface ChatDrawerHeaderProps {
  onClose: () => void;
}

export const ChatDrawerHeader: React.FC<ChatDrawerHeaderProps> = ({ onClose }) => {
  return (
    <div className="chat-drawer-header">
      <h3>Chats</h3>
      <button onClick={onClose} className="chat-drawer-close">×</button>
    </div>
  );
};
