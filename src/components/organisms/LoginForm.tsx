import React, { useState } from 'react';
import { InputField } from '../molecules/InputField';
import { PasswordInput } from '../molecules/PasswordInput';
import { Button } from '../atoms/Button';
import { ErrorAlert } from '../molecules/ErrorAlert';

interface LoginFormProps {
  onSubmit: (email: string, password: string) => void;
  isLoading?: boolean;
  serverError?: string | null;
  onClearError?: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  onSubmit,
  isLoading = false,
  serverError,
  onClearError,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateEmail = (value: string) => {
    if (!value) {
      setEmailError('El email es requerido');
    } else if (!value.includes('@')) {
      setEmailError('Email inválido');
    } else {
      setEmailError('');
    }
  };

  const validatePassword = (value: string) => {
    if (!value) {
      setPasswordError('La contraseña es requerida');
    } else if (value.length < 6) {
      setPasswordError('Mínimo 6 caracteres');
    } else {
      setPasswordError('');
    }
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    validateEmail(email);
    validatePassword(password);
    if (!emailError && !passwordError && email && password) {
      onSubmit(email, password);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <ErrorAlert message={serverError ?? null} onClose={onClearError || (() => { })} />

      <InputField
        label="📧 Correo electrónico"
        type="email"
        placeholder="demo@ejemplo.com"
        value={email}
        onChange={(value) => {
          setEmail(value);
          validateEmail(value);
        }}
        onBlur={() => validateEmail(email)}
        error={emailError}
      />

      <PasswordInput
        value={password}
        onChange={(value) => {
          setPassword(value);
          validatePassword(value);
        }}
        onBlur={() => validatePassword(password)}
        error={passwordError}
      />

      <Button type="submit" disabled={isLoading} variant="primary">
        {isLoading ? 'Iniciando...' : 'Ingresar'}
      </Button>
    </form>
  );
};
