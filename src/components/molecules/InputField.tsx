import React from 'react';
import { Label } from '../atoms/Label';
import { Input } from '../atoms/Input';
import '../../css/molecules/InputFieldMolecule.css';

interface InputFieldProps {
  label: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  error?: string;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  type,
  placeholder,
  value,
  onChange,
  onBlur,
  error,
}) => {
  return (
    <div className="inputfield-molecule-container">
      <Label text={label} />
      <Input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        hasError={!!error}
      />
      {error && <span className="inputfield-molecule-error">{error}</span>}
    </div>
  );
};
