import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/pages/SelectorRol.css';

const SelectorRolPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="selector-container">
      <div className="selector-card">
        <h1 className="selector-title">Plataforma de Empleo</h1>
        <p className="selector-subtitle">¿Cómo deseas iniciar sesión?</p>

        <div className="selector-buttons">
          <button
            onClick={() => navigate('/login/candidato')}
            className="selector-button selector-candidato"
          >
            👨‍💼 Soy Candidato
          </button>
          <button
            onClick={() => navigate('/login/empresa')}
            className="selector-button selector-empresa"
          >
            🏢 Soy Empresa
          </button>
        </div>

        {/* ENLACE DE REGISTRO*/}
        <div className="selector-register-link">
          <button
            onClick={() => navigate('/registro/candidato')}
            className="selector-register-button"
          >
            ¿Eres nuevo? Regístrate como Candidato
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectorRolPage;
