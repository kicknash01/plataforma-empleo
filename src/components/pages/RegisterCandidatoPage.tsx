import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthTemplate } from '../templates/AuthTemplate';
import { RegisterCandidatoForm } from '../organisms/RegisterCandidatoForm';
import type { RegisterCandidatoFormData } from '../../schemas/registerCandidatoSchema';

const RegisterCandidatoPage: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const handleRegister = async (data: RegisterCandidatoFormData) => {
    setIsLoading(true);
    setServerError(null);

    try {
      console.log('Registrando:', data);
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('¡Registro exitoso! Ahora puedes iniciar sesión.');
      navigate('/login/candidato');
    } catch (err) {
      console.error('Error en registro:', err);
      setServerError('Error en el registro. Intenta nuevamente.');
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
