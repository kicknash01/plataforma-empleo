import React from 'react';
import '../../css/molecules/ErrorAlert.css';

interface ErrorAlertProps {
  message: string | null;
  onClose: () => void;
}

export const ErrorAlert: React.FC<ErrorAlertProps> = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="error-alert-container">
      <span>⚠️</span>
      <p className="error-alert-text">{message}</p>
      <button onClick={onClose} className="error-alert-close">
        ×
      </button>
    </div>
  );
};
