import React from 'react';
import './dashboard.css';
import { Link, useNavigate } from 'react-router-dom';

interface DashboardProps {
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  const navigate = useNavigate(); 

  // Função para redirecionar para o Dashboard ao clicar no logo
  const handleLogoClick = () => {
    navigate('/');
  };

  const relatoriosCardClick = () => {
    navigate('/relatorios');
  };

  const nova_consultaCardClick = () => {
    navigate('/nova_consulta');
  };

  const handleLogoutClick = () => {
    onLogout(); 
    navigate('/login'); 
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="logo-section" onClick={handleLogoClick}>
          <img src="/Images/logo.png" alt="Pata de cachorro" className="company-logo"/>
          <h1 className="company-name">VETERINÁRIA<br />FRANCISCO</h1>
        </div>
        <nav className="dashboard-main-nav">
          <ul>
            <li><Link to="/consultas_dia">Consulta</Link></li>
            <li><Link to="/nova_consulta">Agendamento</Link></li>
            <li><a href="#">Produtos</a></li>
            <li><Link to="/relatorios">Relatórios</Link></li>
          </ul>
        </nav>
        <button onClick={handleLogoutClick} className="logout-link">
          Sair
        </button>
      </header>

      <main className="dashboard-main">
        <h2 className="dashboard-main-title">O que você quer fazer?</h2>
        <div className="actions-grid">
          <button className="action-card" onClick={() => navigate('/nova_consulta')}>
            <h3>Agendar Consulta</h3>
          </button>
          <button className="action-card" onClick={() => navigate('/consultas_dia')}>
            <h3>Consultas do Dia</h3>
          </button>
          <button className="action-card">
            <h3>Produtos e Serviços</h3>
          </button>
          <button className="action-card">
            <h3>Prontuários</h3>
          </button>
          <button className="action-card" onClick={relatoriosCardClick}>
            <h3>Relatórios</h3>
          </button>
          <button className="action-card">
            <h3>Notificações</h3>
          </button>
          <button className="action-card" onClick={() => navigate('/cadastro_cliente')}>
            <h3>Cadastrar Cliente</h3>
          </button>
          <button className="action-card" onClick={() => navigate('/cadastro_pet')}>
            <h3>Cadastrar Pet</h3>
          </button>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;