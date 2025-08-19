import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './relatorios.css';

interface RelatoriosProps {
  onLogout: () => void;
}

const Relatorios: React.FC<RelatoriosProps> = ({ onLogout }) => {
  const navigate = useNavigate(); 
  
  // Função para redirecionar para o Dashboard ao clicar no logo
  const handleLogoClick = () => {
    navigate('/');
  };
  
  return (
    <div className="relatorios-container">
      <header className="relatorios-header">
        <div className="logo-section" onClick={handleLogoClick}>
          <img src="/Images/logo.png" alt="Pata de cachorro" className="company-logo"/>
          <h1 className="company-name">VETERINÁRIA<br />FRANCISCO</h1>
        </div>
        <nav className="main-nav">
          <ul>
            <li><Link to="/consultas_dia">Consulta</Link></li>
            <li><Link to="/nova_consulta">Agendamento</Link></li>
            <li><Link to="/relatorios">Relatórios</Link></li>
          </ul>
        </nav>
        <button onClick={onLogout} className="logout-link">
          Sair
        </button>
      </header>

      <main className="relatorios-main">
        <h2 className="dashboard-main-title">Relatórios</h2>
        <div className="actions-grid">
          <button className="action-card">
            <h3>Prontuários</h3>
          </button>
          <button className="action-card">
            <h3>Consultas</h3>
          </button>
          <button className="action-card">
            <h3>Produtos</h3>
          </button>
          <button className="action-card">
            <h3>Estoque</h3>
          </button>
          <button className="action-card">
            <h3>Cobrança</h3>
          </button>
          <button className="action-card">
            <h3>Personalizado</h3>
          </button>
        </div>
      </main>
    </div>
  );
};

export default Relatorios;