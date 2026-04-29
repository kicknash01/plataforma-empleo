import React from 'react';
import '../../css/templates/AuthTemplate.css';

interface AuthTemplateProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

export const AuthTemplate: React.FC<AuthTemplateProps> = ({
  children,
  title,
  subtitle,
}) => {
  return (
    <div className="auth-template-container">
      <div className="auth-template-card">
        <h1 className="auth-template-title">{title}</h1>
        {subtitle && <p className="auth-template-subtitle">{subtitle}</p>}
        {children}
      </div>
    </div>
  );
};
