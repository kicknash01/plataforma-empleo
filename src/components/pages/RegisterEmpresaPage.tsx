import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthTemplate } from '../templates/AuthTemplate';
import { RegisterEmpresaForm } from '../organisms/RegisterEmpresaForm';
import { emailService } from '../../services/emailService';
import type { RegisterEmpresaFormData } from '../../schemas/registerEmpresaSchema';

const RegisterEmpresaPage: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const handleRegister = async (data: RegisterEmpresaFormData) => {
    setIsLoading(true);
    setServerError(null);

    try {
      console.log('Registrando empresa:', data);

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
    <AuthTemplate title="Registro Empresa" subtitle="Crea tu cuenta empresarial">
      <RegisterEmpresaForm
        onSubmit={handleRegister}
        isLoading={isLoading}
        serverError={serverError}
        onClearError={handleClearError}
      />
    </AuthTemplate>
  );
};

export default RegisterEmpresaPage;
