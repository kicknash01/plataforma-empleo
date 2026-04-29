import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthTemplate } from '../templates/AuthTemplate';
import { EditarEmpresaForm } from '../../components/EditarEmpresaForm';
import { useEditarEmpresa } from '../../hooks/useEditarEmpresa';
import { useEditarEmpresaForm } from '../../hooks/useEditarEmpresaForm';
import { tamaniosEmpresa, sectoresEmpresa } from '../../schemas/editarEmpresaSchema';
import '../../css/pages/EditarPerfilEmpresa.css';

const EditarPerfilEmpresa: React.FC = () => {
  const navigate = useNavigate();
  const { formData, isLoading, isSaving, error, updateFormData, saveChanges } = useEditarEmpresa();
  const { errors, handleChange, validateField, validateAll, setFormData } = useEditarEmpresaForm(null);

  useEffect(() => {
    if (formData) {
      setFormData(formData);
    }
  }, [formData, setFormData]);

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
    <AuthTemplate title="Editar Perfil" subtitle="Actualiza la información de tu empresa">
      <EditarEmpresaForm
        formData={formData}
        errors={errors}
        isSaving={isSaving}
        serverError={error}
        tamanioOptions={tamaniosEmpresa}
        sectorOptions={sectoresEmpresa}
        onSubmit={handleSubmit}
        onCancel={() => navigate('/dashboard')}
        handleChange={handleFormChange}
        validateField={validateField}
      />
    </AuthTemplate>
  );
};

export default EditarPerfilEmpresa;
