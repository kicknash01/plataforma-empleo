import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthTemplate } from '../templates/AuthTemplate';

const RegistroSelectorPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <AuthTemplate title="Crear cuenta" subtitle="¿Cómo deseas registrarte?">
      <div className="registro-options">
        <button
          onClick={() => navigate('/registro/candidato')}
          className="registro-option-btn candidato"
        >
          <span className="registro-option-icon">👨‍💼</span>
          <h3>Registrarme como Candidato</h3>
          <p>Encuentra las mejores ofertas de trabajo</p>
        </button>
        <button
          onClick={() => navigate('/registro/empresa')}
          className="registro-option-btn empresa"

        >
          <span className="registro-option-icon">🏢</span>
          <h3>Registrarme como Empresa</h3>
          <p>Publica ofertas y encuentra talento</p>
        </button>
      </div>

      <div className="registro-login-link">
        <button
          onClick={() => navigate('/login')}
          className="registro-login-button"
        >
          ¿Ya tienes cuenta? Inicia sesión
        </button>
      </div>
    </AuthTemplate>
  );
};

export default RegistroSelectorPage;
