import React, { useState } from 'react';
import { Link, Navigate, NavLink, useNavigate } from 'react-router-dom';
import './nova_consulta.css';

interface Nova_ConsultaProps {
    onLogout: () => void;
}

const Nova_Consulta: React.FC<Nova_ConsultaProps> = ({ onLogout }) => {
    const navigate = useNavigate();

    // Função para redirecionar para o Dashboard ao clicar no logo
    const handleLogoClick = () => {
        navigate('/');
    };

    const [petName, setPetName] = useState('');
    const [tutorName, setTutorName] = useState('');
    const [dataConsulta, setDataConsulta] = useState('');
    const [horaConsulta, setHoraConsulta] = useState('');
    const [veterinario, setVeterinario] = useState('');
    const [agendamentoMessage, setAgendamentoMessage] = useState('');
    const [showMessage, setShowMessage] = useState(false);

    // Lógica para formatar a data enquanto o usuário digita
    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;

        // Remove qualquer caractere que não seja um número
        const cleanValue = value.replace(/\D/g, '');

        let formattedValue = '';

        // Lógica para adicionar as barras no formato dd/mm/aaaa
        if (cleanValue.length > 0) {
            formattedValue = cleanValue.substring(0, 2);
            if (cleanValue.length > 2) {
                formattedValue += '/' + cleanValue.substring(2, 4);
            }
            if (cleanValue.length > 4) {
                formattedValue += '/' + cleanValue.substring(4, 8);
            }
        }

        // Limita o tamanho da string formatada para 10 caracteres (dd/mm/aaaa)
        if (formattedValue.length <= 10) {
            setDataConsulta(formattedValue);
        }
    };

    // Função para validar se a data é real
    const isDateValid = (dateString: string): boolean => {
        const regex = /^\d{2}\/\d{2}\/\d{4}$/;
        if (!regex.test(dateString)) return false;
        const parts = dateString.split('/').map(part => parseInt(part, 10));
        const day = parts[0];
        const month = parts[1];
        const year = parts[2];
        const date = new Date(year, month - 1, day);
        return date.getFullYear() === year && date.getMonth() + 1 === month && date.getDate() === day;
    };

    // Lógica para formatar a hora enquanto o usuário digita
    const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        const cleanValue = value.replace(/\D/g, '');
        let formattedValue = '';

        // Lógica para adicionar os dois-pontos no formato HH:mm
        if (cleanValue.length > 0) {
            formattedValue = cleanValue.substring(0, 2);
            if (cleanValue.length > 2) {
                formattedValue += ':' + cleanValue.substring(2, 4);
            }
        }

        // Limita o tamanho da string formatada para 5 caracteres (HH:mm)
        if (formattedValue.length <= 5) {
            setHoraConsulta(formattedValue);
        }
    };

    // Função para validar se a hora é real (HH:mm)
    const isTimeValid = (timeString: string): boolean => {
        const regex = /^\d{2}:\d{2}$/;
        if (!regex.test(timeString)) return false;

        const parts = timeString.split(':').map(part => parseInt(part, 10));
        const hours = parts[0];
        const minutes = parts[1];

        // Verifica se a hora está entre 0 e 23 e os minutos entre 0 e 59
        return hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59;
    };

    // Função para limpar todos os campos
    const clearForm = () => {
        setPetName('');
        setTutorName('');
        setDataConsulta('');
        setHoraConsulta('');
        setVeterinario('');
    };

    // FUNÇÃO DE LIMPEZA E NAVEGAÇÃO ATUALIZADA
    const clearFormAndNavigate = () => {
        setPetName('');
        setTutorName('');
        setDataConsulta('');
        setHoraConsulta('');
        setVeterinario('');
        navigate('/');
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (!isDateValid(dataConsulta)) {
            alert('Por favor, insira uma data válida (dd/mm/aaaa).');
            return;
        }
        if (!isTimeValid(horaConsulta)) {
            alert('Por favor, insira uma hora válida (HH:mm).');
            return;
        }

        setAgendamentoMessage('Consulta agendada com sucesso!');
        setShowMessage(true);

        /* Limpa os dados do formulário */
        clearForm();

        setTimeout(() => {
            setShowMessage(false);
            setAgendamentoMessage('');
        }, 5000);
    };

    return (
        <div className="nova_consulta-container">
            <header className="nova_consulta-header">
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
                    <h2 className="main-title">Nova Consulta</h2>
                </div>
                <div className="main-content-area">
                    <aside className="menu-main">
                        <h2 className="menu-main-title">Agendamento</h2>
                        <nav className="menu-nav">
                            <ul>
                                <li>
                                    <NavLink
                                        to="/nova_consulta"
                                        className={({ isActive }) => (isActive ? 'active' : '')}>
                                        Nova Consulta
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/remarcar_consulta"
                                        className={({ isActive }) => (isActive ? 'active' : '')}>
                                        Remarcar Consulta
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/cancelar_consulta"
                                        className={({ isActive }) => (isActive ? 'active' : '')}>
                                        Cancelar Consultas
                                    </NavLink>
                                </li>
                            </ul>
                        </nav>
                    </aside>
                    <div className="form-content">
                        <h2 className="main-content-title">Preencha os dados da consulta</h2>
                        <div className={`success-message ${showMessage ? 'visible' : ''}`}>
                            {agendamentoMessage}
                        </div>
                        <form className="inputs">
                            <div className="input-field">
                                <input
                                    type="text"
                                    id="nome-pet"
                                    placeholder="Nome Pet"
                                    value={petName}
                                    onChange={(e) => setPetName(e.target.value)}
                                />
                            </div>
                            <div className="input-field">
                                <input
                                    type="text"
                                    id="nome-tutor"
                                    placeholder="Nome Tutor"
                                    value={tutorName}
                                    onChange={(e) => setTutorName(e.target.value)}
                                />
                            </div>
                            <div className="input-field">
                                <input
                                    type="text"
                                    id="data-consulta"
                                    placeholder="dd/mm/aaaa"
                                    value={dataConsulta}
                                    onChange={handleDateChange}
                                />
                            </div>
                            <div className="input-field">
                                <input
                                    type="text"
                                    id="hora-consulta"
                                    placeholder="hh:mm"
                                    value={horaConsulta}
                                    onChange={handleTimeChange}
                                />
                            </div>
                            <div className="input-field input-prefix-container">
                                <span className="input-prefix">Dr.</span>
                                <input
                                    type="text"
                                    id="nome-vet"
                                    className="input-with-prefix"
                                    placeholder="Nome do Veterinário"
                                    value={veterinario}
                                    onChange={(e) => setVeterinario(e.target.value)}
                                />
                            </div>
                        </form>
                        <form className="inputs" onSubmit={handleSubmit}>
                            <div className="button-container">
                                <button className="btn-cancelar" type="button" onClick={clearFormAndNavigate}>Cancelar</button>
                                <button className="btn-agendar" type="submit">Agendar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Nova_Consulta;