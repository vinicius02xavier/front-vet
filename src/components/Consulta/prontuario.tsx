import React, { useState } from 'react';
import { Link, Navigate, NavLink, useNavigate } from 'react-router-dom';
import './prontuario.css';

interface ProntuarioProps {
    onLogout: () => void;
}

const Prontuario: React.FC<ProntuarioProps> = ({ onLogout }) => {
    const navigate = useNavigate();

    // Função para redirecionar para o Dashboard ao clicar no logo
    const handleLogoClick = () => {
        navigate('/');
    };

    return (
        <div className="prontuario-container">
            <header className="prontuario-header">
                <div className="logo-section" onClick={handleLogoClick}>
                    <img src="/Images/logo.png" alt="Pata de cachorro" className="company-logo" />
                    <h1 className="company-name">VETERINÁRIA<br />FRANCISCO</h1>
                </div>
                <nav className="main-nav">
                    <ul>
                        <li><Link to="/consultas_dia">Consulta</Link></li>
                        <li><Link to="/nova_consulta">Agendamento</Link></li>
                        <li><a href="#">Produtos</a></li>
                        <li><Link to="/relatorios">Relatórios</Link></li>
                    </ul>
                </nav>
                <button onClick={onLogout} className="logout-link">
                    Sair
                </button>
            </header>
            <main className="content-wrapper">
                <div className="main-title-container">
                    <h2 className="main-title">Prontuário Médico</h2>
                </div>
                <div className="main-content-area">
                    <aside className="menu-main">
                        <h2 className="menu-main-title">Consulta</h2>
                        <nav className="menu-nav">
                            <ul>
                                <li>
                                    <NavLink
                                        to="/consultas_dia"
                                        className={({ isActive }) => (isActive ? 'active' : '')}>
                                        Consultas do Dia
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/ficha_veterinaria"
                                        className={({ isActive }) => (isActive ? 'active' : '')}>
                                        Ficha Veterinária
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/prescricao"
                                        className={({ isActive }) => (isActive ? 'active' : '')}>
                                        Prescrição
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/prontuario"
                                        className={({ isActive }) => (isActive ? 'active' : '')}>
                                        Prontuário
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/pesquisar"
                                        className={({ isActive }) => (isActive ? 'active' : '')}>
                                        Pesquisar
                                    </NavLink>
                                </li>
                            </ul>
                        </nav>
                    </aside>
                    <div className="form-content">
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Prontuario;