import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthTemplate } from '../templates/AuthTemplate';
import { EditarPerfilForm } from '../../components/EditarPerfilForm';
import { useEditarCandidato } from '../../hooks/useEditarCandidato';
import { useEditarPerfilForm } from '../../hooks/useEditarPerfilForm';
import { areasTrabajo } from '../../schemas/registerCandidatoSchema';
import '../../css/pages/EditarPerfilCandidato.css';

const areaOptions = areasTrabajo.map(area => ({ value: area, label: area }));

const EditarPerfilCandidato: React.FC = () => {
  const navigate = useNavigate();
  const { formData, isLoading, isSaving, error, updateFormData, saveChanges } = useEditarCandidato();
  const { errors, handleChange, validateField, validateAll, setFormData } = useEditarPerfilForm(null);

  useEffect(() => {
    if (formData) {
      setFormData(formData);
    }
  }, [formData, setFormData]);

  // Sincronizar cambios del formulario con el hook
  const handleFormChange = (name: string, value: string) => {
    handleChange(name, value);
    if (formData) {
      const updatedData = { ...formData, [name]: value };
      updateFormData(updatedData);
    }
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (validateAll() && formData) {
      saveChanges();
    }
  };

  if (isLoading || !formData) {
    return (
      <AuthTemplate title="Editar Perfil" subtitle="Cargando tus datos...">
        <div className="loading-spinner">Cargando...</div>
      </AuthTemplate>
    );
  }

  return (
    <AuthTemplate title="Editar Perfil" subtitle="Actualiza tu información personal">
      <EditarPerfilForm
        formData={formData}
        errors={errors}
        isSaving={isSaving}
        serverError={error}
        areaOptions={areaOptions}
        onSubmit={handleSubmit}
        onCancel={() => navigate('/dashboard')}
        handleChange={handleFormChange}
        validateField={validateField}
      />
    </AuthTemplate>
  );
};

export default EditarPerfilCandidato;
