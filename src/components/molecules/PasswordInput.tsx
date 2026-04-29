import React, { useState } from 'react';
import { Label } from '../atoms/Label';
import '../../css/molecules/PasswordInputMolecule.css';

interface PasswordInputProps {
  value: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  error?: string;
}

export const PasswordInput: React.FC<PasswordInputProps> = ({
  value,
  onChange,
  onBlur,
  error,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="password-molecule-container">
      <Label text="🔒 Contraseña" />
      <div className="password-molecule-wrapper">
        <input
          type={showPassword ? 'text' : 'password'}
          placeholder="••••••"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          className={`password-molecule-input ${error ? 'password-molecule-input-error' : ''}`}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="password-molecule-toggle"
        >
          {showPassword ? '🙈' : '👁️'}
        </button>
      </div>
      {error && <span className="password-molecule-error">{error}</span>}
    </div>
  );
};
