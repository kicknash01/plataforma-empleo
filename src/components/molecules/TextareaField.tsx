import React from 'react';
import { Label } from '../atoms/Label';
import { Textarea } from '../atoms/Textarea';
import '../../css/molecules/TextareaField.css'

interface TextareaFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  rows?: number;
  error?: string;
  required?: boolean;
  maxLength?: number;
  showCounter?: boolean;
}

export const TextareaField: React.FC<TextareaFieldProps> = ({
  label,
  value,
  onChange,
  onBlur,
  placeholder = '',
  rows = 4,
  error,
  required = false,
  maxLength = 500,
  showCounter = true,
}) => {
  return (
    <div className="textarea-field-container">
      <Label text={label} required={required} />

      <Textarea
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        rows={rows}
        hasError={!!error}
      />

      {error && <span className="textarea-field-error">{error}</span>}

      {showCounter && (
        <p className="textarea-field-counter">
          {value.length}/{maxLength} caracteres
        </p>
      )}
    </div>
  );
};
