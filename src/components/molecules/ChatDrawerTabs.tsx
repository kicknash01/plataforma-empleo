import React from 'react';

interface ChatDrawerTabsProps {
  filter: 'todos' | 'noLeidos';
  onFilterChange: (filter: 'todos' | 'noLeidos') => void;
  totalNoLeidos: number;
}

export const ChatDrawerTabs: React.FC<ChatDrawerTabsProps> = ({ filter, onFilterChange, totalNoLeidos }) => {
  return (
    <div className="chat-drawer-tabs">
      <button
        className={`chat-drawer-tab ${filter === 'todos' ? 'active' : ''}`}
        onClick={() => onFilterChange('todos')}
      >
        Todos
      </button>
      <button
        className={`chat-drawer-tab ${filter === 'noLeidos' ? 'active' : ''}`}
        onClick={() => onFilterChange('noLeidos')}
      >
        No leídos {totalNoLeidos > 0 && `(${totalNoLeidos})`}
      </button>
    </div>
  );
};
