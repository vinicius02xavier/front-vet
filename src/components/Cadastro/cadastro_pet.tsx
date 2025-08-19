import React, { useState } from 'react';
import { Link, Navigate, NavLink, useNavigate } from 'react-router-dom';
import './cadastro_pet.css';

interface Cadatro_PetProps {
    onLogout: () => void;
}

const Cadastro_Pet: React.FC<Cadatro_PetProps> = ({ onLogout }) => {
    const navigate = useNavigate();

    // Função para redirecionar para o Dashboard ao clicar no logo
    const handleLogoClick = () => {
        navigate('/');
    };

    const [name, setName] = useState('');
    const [especie, setEspecie] = useState('');
    const [raca, setRaca] = useState('');
    const [idade, setIdade] = useState('');
    const [cor, setCor] = useState('');
    const [cadastroMessage, setCadastroMessage] = useState('');
    const [showMessage, setShowMessage] = useState(false);

    // Função para limpar todos os campos
    const clearForm = () => {
        setName('');
        setEspecie('');
        setRaca('');
        setIdade('');
        setCor('');
    };

    // Função de limpeza e navegação
    const clearFormAndNavigate = () => {
        setName('');
        setEspecie('');
        setRaca('');
        setIdade('');
        setCor('');
        navigate('/');
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        //Lógica para verificar se os campos estão preenchidos
        if (!name || !especie || !idade || !cor) {
            alert('Por favor, preencha todos os campos.');
            return;
        }
        
        setCadastroMessage('Pet cadastrado com sucesso!');
        setShowMessage(true);

        /* Limpa os dados do formulário */
        clearForm();

        setTimeout(() => {
            setShowMessage(false);
            setCadastroMessage('');
        }, 5000);
    }

    return (
        <div className="cadastro_pet-container">
            <header className="cadastro_pet-header">
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
                    <h2 className="main-title">Cadastro Cliente</h2>
                </div>
                <div className="main-content-area">
                    <aside className="menu-main">
                        <h2 className="menu-main-title">Cadastro</h2>
                        <nav className="menu-nav">
                            <ul>
                                <li>
                                    <NavLink
                                        to="/cadastro_cliente"
                                        className={({ isActive }) => (isActive ? 'active' : '')}>
                                        Cliente
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/cadastro_pet"
                                        className={({ isActive }) => (isActive ? 'active' : '')}>
                                        Pet
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/pesquisa_cliente"
                                        className={({ isActive }) => (isActive ? 'active' : '')}>
                                        Pesquisar
                                    </NavLink>
                                </li>
                            </ul>
                        </nav>
                    </aside>
                    <div className="form-content">
                        <h2 className="main-content-title">Preencha os dados do pet</h2>
                        <div className={`success-message ${showMessage ? 'visible' : ''}`}>
                            {cadastroMessage}
                        </div>
                        <form className="inputs">
                            <div className="input-field">
                                <input
                                    type="text"
                                    id="nome"
                                    placeholder="Nome"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="input-field">
                                <input
                                    type="text"
                                    id="especie"
                                    placeholder="Espécie"
                                    value={especie}
                                    onChange={(e) => setEspecie(e.target.value)}
                                />
                            </div>
                            <div className="input-field">
                                <input
                                    type="raca"
                                    id="raca"
                                    placeholder="Raça"
                                    value={raca}
                                    onChange={(e) => setRaca(e.target.value)}
                                />
                            </div>
                            <div className="input-field">
                                <input
                                    type="text"
                                    id="idade"
                                    placeholder="Idade"
                                    value={idade}
                                    onChange={(e) => setIdade(e.target.value)}
                                />
                            </div>
                            <div className="input-field">
                                <input
                                    type="text"
                                    id="cor"
                                    placeholder="Cor"
                                    value={cor}
                                    onChange={(e) => setCor(e.target.value)}
                                />
                            </div>
                        </form>
                        <form className="inputs" onSubmit={handleSubmit}>
                            <div className="button-container">
                                <button className="btn-cancelar" type="button" onClick={clearFormAndNavigate}>Cancelar</button>
                                <button className="btn-cadastrar" type="submit">Cadastrar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Cadastro_Pet;