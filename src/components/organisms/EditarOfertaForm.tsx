import React, { useState, useCallback } from 'react';
import { InputField } from '../molecules/InputField';
import { TextareaField } from '../molecules/TextareaField';
import { Button } from '../atoms/Button';
import { ErrorAlert } from '../molecules/ErrorAlert';
import { tiposTrabajo } from '../../schemas/ofertaSchema';
import type { Oferta } from '../../schemas/ofertaSchema';

interface EditarOfertaFormProps {
  ofertaActual: Oferta;
  onSubmit: (data: Oferta) => void;
  onCancel: () => void;
  isSaving?: boolean;
  serverError?: string | null;
  onClearError?: () => void;
}

const VALIDATION_RULES: Record<string, (value: string | number) => string> = {
  titulo: (value) => {
    if (!value) return 'El título es requerido';
    if (String(value).length < 5) return 'Mínimo 5 caracteres';
    return '';
  },
  descripcion: (value) => {
    if (!value) return 'La descripción es requerida';
    if (String(value).length < 20) return 'Mínimo 20 caracteres';
    return '';
  },
  requisitos: (value) => {
    if (!value) return 'Los requisitos son requeridos';
    if (String(value).length < 10) return 'Mínimo 10 caracteres';
    return '';
  },
  ubicacion: (value) => {
    if (!value) return 'La ubicación es requerida';
    if (String(value).length < 3) return 'Mínimo 3 caracteres';
    return '';
  },
};

export const EditarOfertaForm: React.FC<EditarOfertaFormProps> = ({
  ofertaActual,
  onSubmit,
  onCancel,
  isSaving = false,
  serverError,
  onClearError,
}) => {
  const [formData, setFormData] = useState<Oferta>({ ...ofertaActual });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateField = useCallback((name: string, value: string | number) => {
    const rule = VALIDATION_RULES[name];
    const error = rule ? rule(value) : '';
    setErrors((prev) => ({ ...prev, [name]: error }));
    return error === '';
  }, []);

  const validateAll = useCallback(() => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    (Object.keys(VALIDATION_RULES) as Array<keyof typeof VALIDATION_RULES>).forEach((key) => {
      const value = formData[key as keyof typeof formData];
      if (typeof value === 'string' || typeof value === 'number') {
        const error = VALIDATION_RULES[key](value);
        if (error) {
          newErrors[key] = error;
          isValid = false;
        }
      }
    });

    setErrors(newErrors);
    return isValid;
  }, [formData]);

  const handleChange = useCallback((name: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  }, [validateField]);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (validateAll()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="editar-oferta-form">
      <ErrorAlert message={serverError ?? null} onClose={onClearError || (() => { })} />

      <InputField
        label="📌 Título del puesto"
        type="text"
        placeholder="Ej: Desarrollador React Junior"
        value={formData.titulo}
        onChange={(value) => handleChange('titulo', value)}
        onBlur={() => validateField('titulo', formData.titulo)}
        error={errors.titulo}
      />

      <TextareaField
        label="📝 Descripción del puesto"
        value={formData.descripcion}
        onChange={(value) => handleChange('descripcion', value)}
        placeholder="Describe las responsabilidades..."
        rows={4}
        error={errors.descripcion}
        maxLength={2000}
        showCounter={true}
      />

      <TextareaField
        label="🔧 Requisitos"
        value={formData.requisitos}
        onChange={(value) => handleChange('requisitos', value)}
        placeholder="Tecnologías requeridas..."
        rows={4}
        error={errors.requisitos}
        maxLength={1000}
        showCounter={true}
      />

      <InputField
        label="📍 Ubicación"
        type="text"
        placeholder="Ej: Santiago, Chile (Remoto)"
        value={formData.ubicacion}
        onChange={(value) => handleChange('ubicacion', value)}
        onBlur={() => validateField('ubicacion', formData.ubicacion)}
        error={errors.ubicacion}
      />

      <div className="form-group">
        <label className="form-label">💼 Tipo de trabajo</label>
        <select
          value={formData.tipoTrabajo}
          onChange={(e) => handleChange('tipoTrabajo', e.target.value)}
          className="form-select"
        >
          {tiposTrabajo.map((tipo) => (
            <option key={tipo.value} value={tipo.value}>{tipo.label}</option>
          ))}
        </select>
      </div>

      <div className="form-row">
        <InputField
          label="💰 Salario mínimo (CLP)"
          type="number"
          placeholder="0"
          value={formData.salarioMin.toString()}
          onChange={(value) => handleChange('salarioMin', Number(value))}
          onBlur={() => validateField('salarioMin', formData.salarioMin)}
          error={errors.salarioMin}
        />
        <InputField
          label="💰 Salario máximo (CLP)"
          type="number"
          placeholder="0"
          value={formData.salarioMax.toString()}
          onChange={(value) => handleChange('salarioMax', Number(value))}
          onBlur={() => validateField('salarioMax', formData.salarioMax)}
          error={errors.salarioMax}
        />
      </div>

      <div className="form-buttons">
        <Button type="button" variant="danger" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" variant="success" disabled={isSaving}>
          {isSaving ? 'Guardando...' : 'Guardar cambios'}
        </Button>
      </div>
    </form>
  );
};
