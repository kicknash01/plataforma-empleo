import React from 'react';
import '../../css/atoms/Label.css';

interface LabelProps {
  text: string;
  htmlFor?: string;
  required?: boolean;
}

export const Label: React.FC<LabelProps> = ({ text, htmlFor }) => {
  return (
    <label htmlFor={htmlFor} className="label-atom">
      {text}
    </label>
  );
};
