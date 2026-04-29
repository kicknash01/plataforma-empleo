import React, { useState } from 'react';
import { InputField } from '../molecules/InputField';
import { PasswordInput } from '../molecules/PasswordInput';
import { Button } from '../atoms/Button';
import { ErrorAlert } from '../molecules/ErrorAlert';
import '../../css/organisms/LoginForm.css';

interface LoginFormProps {
  onSubmit: (email: string, password: string) => void;
  isLoading?: boolean;
  serverError?: string | null;
  onClearError?: () => void;
  variant?: 'candidato' | 'empresa';
}

export const LoginForm: React.FC<LoginFormProps> = ({
  onSubmit,
  isLoading = false,
  serverError,
  onClearError,
  variant = 'candidato',
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

    const hasEmailError = emailError !== '';
    const hasPasswordError = passwordError !== '';

    if (!hasEmailError && !hasPasswordError && email && password) {
      onSubmit(email, password);
    }
  };

  const buttonVariant = variant === 'candidato' ? 'primary' : 'success';
  const buttonText = variant === 'candidato' ? 'Iniciar sesión como Candidato' : 'Ingresar como Empresa';

  return (
    <form onSubmit={handleSubmit}>
      <ErrorAlert message={serverError ?? null} onClose={onClearError || (() => { })} />

      <InputField
        label="📧 Correo electrónico"
        type="email"
        placeholder={variant === 'candidato' ? 'demo@candidato.com' : 'demo@empresa.com'}
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

      <Button
        type="submit"
        disabled={isLoading}
        variant={buttonVariant}
      >
        {isLoading ? 'Iniciando...' : buttonText}
      </Button>
    </form>
  );
};
