import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthTemplate } from '../templates/AuthTemplate';
import { RegisterEmpresaForm } from '../organisms/RegisterEmpresaForm';
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
      // Simular llamada al servidor (1 segundo)
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('¡Registro exitoso! Ahora puedes iniciar sesión.');
      navigate('/login/empresa');
    } catch {
      setServerError('Error en el registro. Intenta nuevamente.');
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
