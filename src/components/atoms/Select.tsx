import React from 'react';
import '../../css/atoms/Seletc.css';

interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  options: Array<{ value: string; label: string }>;
  placeholder?: string;
  hasError?: boolean;
}

export const Select: React.FC<SelectProps> = ({
  value,
  onChange,
  onBlur,
  options,
  placeholder = 'Selecciona una opción',
  hasError = false,
}) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onBlur={onBlur}
      className={`select-atom ${hasError ? 'select-atom-error' : ''}`}
    >
      <option value="">{placeholder}</option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
};
