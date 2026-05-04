import React from 'react';
import '../../css/pages/ChatDrawer.css';

interface ChatFloatingButtonProps {
  onClick: () => void;
  unreadCount: number;
}

export const ChatFloatingButton: React.FC<ChatFloatingButtonProps> = ({ onClick, unreadCount }) => {
  return (
    <button className="chat-floating-btn" onClick={onClick}>
      💬
      {unreadCount > 0 && <span className="chat-floating-badge">{unreadCount}</span>}
    </button>
  );
};
