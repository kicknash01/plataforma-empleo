import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/auth-store';
import { useOfertaStore } from '../../stores/ofertaStore';
import { AuthTemplate } from '../templates/AuthTemplate';
import { CrearOfertaForm } from '../organisms/CrearOfertaForm';
import type { CrearOfertaFormData } from '../../schemas/ofertaSchema';

const CrearOfertaPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { crearOferta, isLoading, error, limpiarError } = useOfertaStore();
  const [serverError, setServerError] = useState<string | null>(null);

  const handleSubmit = async (data: CrearOfertaFormData) => {
    if (!user) return;

    const success = await crearOferta(data, user.id, user.nombre);
    if (success) {
      navigate('/mis-ofertas');
    } else {
      setServerError(error);
    }
  };

  const handleClearError = () => {
    setServerError(null);
    limpiarError();
  };

  return (
    <AuthTemplate title="Crear oferta" subtitle="Publica una nueva vacante">
      <CrearOfertaForm
        onSubmit={handleSubmit}
        isLoading={isLoading}
        serverError={serverError}
        onClearError={handleClearError}
      />
    </AuthTemplate>
  );
};

export default CrearOfertaPage;
