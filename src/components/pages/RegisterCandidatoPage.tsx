import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthTemplate } from '../templates/AuthTemplate';
import { RegisterCandidatoForm } from '../organisms/RegisterCandidatoForm';
import { emailService } from '../../services/emailService';
import type { RegisterCandidatoFormData } from '../../schemas/registerCandidatoSchema';

const RegisterCandidatoPage: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const handleRegister = async (data: RegisterCandidatoFormData) => {
    setIsLoading(true);
    setServerError(null);

    try {
      console.log('Registrando candidato:', data);

      // Simular llamada al servidor (1 segundo)
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Enviar email de verificación
      const mockToken = 'mock-token-' + Math.random().toString(36);
      await emailService.enviarVerificacion(data.email, mockToken);
      console.log(`🔗 Link de verificación: http://localhost:5173/verificar-email?token=${mockToken}`);

      alert('¡Registro exitoso! Revisa tu email para verificar tu cuenta.');
      navigate('/login');
    } catch (err: unknown) {
      console.error('Error en registro:', err);
      if (err instanceof Error) {
        setServerError(err.message);
      } else {
        setServerError('Ocurrió un error desconocido');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearError = () => setServerError(null);

  return (
    <AuthTemplate title="Registro Candidato" subtitle="Crea tu cuenta para encontrar empleo">
      <RegisterCandidatoForm
        onSubmit={handleRegister}
        isLoading={isLoading}
        serverError={serverError}
        onClearError={handleClearError}
      />
    </AuthTemplate>
  );
};

export default RegisterCandidatoPage;
