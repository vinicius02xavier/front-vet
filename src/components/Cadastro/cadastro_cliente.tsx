import React, { useState } from 'react';
import { Link, Navigate, NavLink, useNavigate } from 'react-router-dom';
import './cadastro_cliente.css';

interface Cadatro_ClienteProps {
    onLogout: () => void;
}

const Cadastro_Cliente: React.FC<Cadatro_ClienteProps> = ({ onLogout }) => {
    const navigate = useNavigate();

    // Função para redirecionar para o Dashboard ao clicar no logo
    const handleLogoClick = () => {
        navigate('/');
    };

    const [name, setName] = useState('');
    const [cpf, setCpf] = useState('');
    const [email, setEmail] = useState('');
    const [endereco, setEndereco] = useState('');
    const [telefone, setTelefone] = useState('');
    const [cadastroMessage, setCadastroMessage] = useState('');
    const [showMessage, setShowMessage] = useState(false);

    // Lógica para formatar a data enquanto o usuário digita
    const handleCpfChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;

        // Remove qualquer caractere que não seja um número
        const cleanValue = value.replace(/\D/g, '');

        let formattedValue = '';

        // Lógica para adicionar pontos e traços no CPF
        if (cleanValue.length > 0) {
            formattedValue = cleanValue.substring(0, 3);
            if (cleanValue.length > 3) {
                formattedValue += '.' + cleanValue.substring(3, 6);
            }
            if (cleanValue.length > 6) {
                formattedValue += '.' + cleanValue.substring(6, 9);
            }
            if (cleanValue.length > 9) {
                formattedValue += '-' + cleanValue.substring(9, 11);
            }
        }

        // Limita o tamanho da string formatada para 11 caracteres (xxx.xxx.xxx-xx)
        if (formattedValue.length <= 14) {
            setCpf(formattedValue);
        }
    };

    const isCpfValid = (cpfString: string): boolean => {
        // Valida o formato do CPF
        const regex = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/;
        if (!regex.test(cpfString)) return false;

        // Remove os caracteres de pontuação e separa os números
        const cpf = cpfString.replace(/\D/g, '');

        // Verifica se todos os números são iguais (ex.: 111.111.111-11)
        if (/^(\d)\1{10}$/.test(cpf)) return false;

        // Validação dos dígitos verificadores
        const calcDigit = (base: string, factor: number[]): number => {
            const sum = base.split('').reduce((acc, digit, i) => acc + Number(digit) * factor[i], 0);
            const remainder = (sum * 10) % 11;
            return remainder === 10 ? 0 : remainder;
        };

        // Verifica os dois dígitos verificadores
        const firstDigit = calcDigit(cpf.substring(0, 9), [10, 9, 8, 7, 6, 5, 4, 3, 2]);
        const secondDigit = calcDigit(cpf.substring(0, 9) + firstDigit, [11, 10, 9, 8, 7, 6, 5, 4, 3, 2]);

        return cpf[9] === firstDigit.toString() && cpf[10] === secondDigit.toString();
    };

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const isEmailValid = (emailString: string): boolean => {
        // Regex simples para validar o formato do e-mail
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(emailString);
    };

    const isTelefoneValid = (telefoneString: string): boolean => {
        // Remover espaços extras antes e depois
        telefoneString = telefoneString.trim();

        // Regex para validar o formato (xx) xxxxx-xxxx
        const regex = /^\(\d{2}\) \d{5}-\d{4}$/;
        if (!regex.test(telefoneString)) {
            return false;
        }

        // Remover os caracteres não numéricos (parênteses, espaço e hífen)
        const cleanedString = telefoneString.replace(/[^\d]/g, "");

        const firstPart = parseInt(cleanedString.substring(0, 2), 10); 
        const secondPart = parseInt(cleanedString.substring(2, 7), 10);
        const thirdPart = parseInt(cleanedString.substring(7), 10);

        // Validar DDD e números dentro dos limites razoáveis
        if (firstPart < 11 || firstPart > 99) {
            return false; 
        }
        if (secondPart < 10000 || secondPart > 99999) {
            return false;
        }
        if (thirdPart < 1000 || thirdPart > 9999) {
            return false;
        }
        return true;
    };


    // Lógica para formatar o telefone enquanto o usuário digita
    const handleTelefoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;

        // Remove qualquer caractere que não seja um número
        const cleanValue = value.replace(/\D/g, '');

        let formattedValue = '';

        // Lógica para adicionar parênteses e traço no telefone
        if (cleanValue.length > 0) {
            formattedValue += '(' + cleanValue.substring(0, 2);
            if (cleanValue.length > 2) {
                formattedValue += ') ' + cleanValue.substring(2, 7);
            }
            if (cleanValue.length > 7) {
                formattedValue += '-' + cleanValue.substring(7, 11);
            }
        }

        // Limita o tamanho da string formatada para 11 caracteres ((xx)xxxxx-xxxx))
        if (formattedValue.length <= 15) {
            setTelefone(formattedValue);
        }
    };

    // Função para limpar todos os campos
    const clearForm = () => {
        setName('');
        setCpf('');
        setEmail('');
        setEndereco('');
        setTelefone('');
    };

    // Função de limpeza e navegação
    const clearFormAndNavigate = () => {
        setName('');
        setCpf('');
        setEmail('');
        setEndereco('');
        setTelefone('');
        navigate('/');
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (!isCpfValid(cpf)) {
            alert('Por favor, insira um CPF válido.');
            return;
        }
        if (!isEmailValid(email)) {
            alert('Por favor, insira um e-mail válido.');
            return;
        }
        if (!isTelefoneValid(telefone)) {
            alert('Por favor, insira um número de telefone válido.');
            return;
        }

        setCadastroMessage('Tutor cadastrado com sucesso!');
        setShowMessage(true);

        /* Limpa os dados do formulário */
        clearForm();

        setTimeout(() => {
            setShowMessage(false);
            setCadastroMessage('');
        }, 5000);
    };

    return (
        <div className="cadastro_cliente-container">
            <header className="cadastro_cliente-header">
                <div className="logo-section" onClick={handleLogoClick}>
                    <img src="/Images/logo.png" alt="Pata de cachorro" className="company-logo" />
                    <h1 className="company-name">VETERINÁRIA<br />FRANCISCO</h1>
                </div>
                <nav className="main-nav">
                    <ul>
                        <li><a href="#">Consulta</a></li>
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
                        <h2 className="main-content-title">Preencha os dados do cliente</h2>
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
                                    id="cpf"
                                    placeholder="CPF"
                                    value={cpf}
                                    onChange={handleCpfChange}
                                />
                            </div>
                            <div className="input-field">
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="E-mail"
                                    value={email}
                                    onChange={handleEmailChange}
                                />
                            </div>
                            <div className="input-field">
                                <input
                                    type="text"
                                    id="endereco"
                                    placeholder="Endereço"
                                    value={endereco}
                                    onChange={(e) => setEndereco(e.target.value)}
                                />
                            </div>
                            <div className="input-field">
                                <input
                                    type="text"
                                    id="telefone"
                                    placeholder="Telefone"
                                    value={telefone}
                                    onChange={handleTelefoneChange}
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
}

export default Cadastro_Cliente;