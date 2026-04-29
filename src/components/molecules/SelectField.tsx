import React from "react";
import { Label } from "../atoms/Label";
import { Select } from "../atoms/Select";
import '../../css/molecules/SelectField.css'

interface SelectFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  options: Array<{ value: string; label: string }>;
  placeholder?: string;
  error?: string;
  required?: boolean;
}

export const SelectField: React.FC<SelectFieldProps> = ({
  label,
  value,
  onChange,
  onBlur,
  options,
  placeholder,
  error,
  required = false,
}) => {
  return (
    <div className="selectfield-container">
      <Label text={label} required={required} />
      <Select
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        options={options}
        placeholder={placeholder}
        hasError={!!error}
      />
      {error && <span className="selectfield-error">{error}</span>}
    </div>
  );
};

