import React from 'react';
import '../../css/atoms/Textarea.css';

interface TextareaProps {
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  rows?: number;
  hasError?: boolean;
}

export const Textarea: React.FC<TextareaProps> = ({
  value,
  onChange,
  onBlur,
  placeholder = '',
  rows = 4,
  hasError = false,
}) => {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onBlur={onBlur}
      placeholder={placeholder}
      rows={rows}
      className={`textarea-atom ${hasError ? 'textarea-atom-error' : ''}`}
    />
  );
};
