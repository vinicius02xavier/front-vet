import React from 'react';
import './dashboard.css';

interface DashboardProps {
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
          <div className="company-info">
            <h1 className="company-name">VETERINÁRIA<br />FRANCISCO</h1>
          </div>
        <nav className="main-nav">
          <ul>
            <li><a href="#">Consulta</a></li>
            <li><a href="#">Agendamento</a></li>
            <li><a href="#">Produtos</a></li>
            <li><a href="#">Relatórios</a></li>
          </ul>
        </nav>
        <button onClick={onLogout} className="logout-button">
          Sair
        </button>
      </header>

      <main className="dashboard-main">
        <h2 className="main-title">O que você quer fazer?</h2>
        <div className="actions-grid">
          <button className="action-card">
            <h3>Agendar Consulta</h3>
          </button>
          <button className="action-card">
            <h3>Consultas do Dia</h3>
          </button>
          <button className="action-card">
            <h3>Produtos e Serviços</h3>
          </button>
          <button className="action-card">
            <h3>Prontuários</h3>
          </button>
          <button className="action-card">
            <h3>Relatórios</h3>
          </button>
          <button className="action-card">
            <h3>Notificações</h3>
          </button>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;