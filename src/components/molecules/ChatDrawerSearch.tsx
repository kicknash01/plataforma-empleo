import React from 'react';

interface ChatDrawerSearchProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export const ChatDrawerSearch: React.FC<ChatDrawerSearchProps> = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="chat-drawer-search">
      <input
        type="text"
        placeholder="Buscar conversación..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="chat-drawer-search-input"
      />
    </div>
  );
};
