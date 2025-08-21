import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import './cancelar_consulta.css';

interface Cancelar_ConsultaProps {
    onLogout: () => void;
}

interface Cancelar_ConsultaState {
    id: string;
    pet: string;
    cliente: string;
    data: string;
    hora: string;
    veterinario: string;
}

const Cancelar_Consulta: React.FC<Cancelar_ConsultaProps> = ({ onLogout }) => {
    const navigate = useNavigate();
    const [selectedAppointmentIds, setSelectedAppointmentIds] = useState<number[]>([]); // Array para múltiplas seleções
    const [searchTerm, setSearchTerm] = useState('');
    const [cancelamentoMessage, setCancelamentoMessage] = useState('');
    const [showCancelamentoMessage, setShowCancelamentoMessage] = useState(false);

    const [consultas, setConsultas] = useState<Cancelar_ConsultaState[]>([
        {
            id: '1',
            pet: 'Rex',
            cliente: 'João Silva',
            data: '01/10/2023',
            hora: '10:00',
            veterinario: 'Dr. Ana'
        },
        {
            id: '2',
            pet: 'Mia',
            cliente: 'Maria Oliveira',
            data: '02/10/2022',
            hora: '11:00',
            veterinario: 'Dr. Pedro'
        }
    ]);

    // Função para redirecionar para o Dashboard ao clicar no logo
    const handleLogoClick = () => {
        navigate('/');
    };

    // Função para lidar com o cancelamento de consultas
    const handleCancelAppointments = () => {
        if (selectedAppointmentIds.length > 0) {
            // Aqui você pode adicionar a lógica para cancelar as consultas selecionadas
            setCancelamentoMessage("Consultas canceladas com sucesso!");
            setShowCancelamentoMessage(true);

            // Remove as consultas da lista
            const updatedConsultas = consultas.filter(
                (consulta) => !selectedAppointmentIds.includes(parseInt(consulta.id))
            );
            setConsultas(updatedConsultas);

            // Redefine os IDs selecionados após o cancelamento
            setSelectedAppointmentIds([]);

            setTimeout(() => {
                setShowCancelamentoMessage(false);
            }, 3000);
        } else {
            alert('Nenhuma consulta selecionada.');
        }
    };

    // Lida com a seleção/deseleção de uma consulta na tabela
    const handleCheckboxChange = (id: number) => {
        setSelectedAppointmentIds((prevSelectedIds) => {
            if (prevSelectedIds.includes(id)) {
                // Se o ID já estiver selecionado, desmarque-o (remove da lista)
                return prevSelectedIds.filter((selectedId) => selectedId !== id);
            } else {
                // Se o ID não estiver selecionado, marque-o (adiciona à lista)
                return [...prevSelectedIds, id];
            }
        });
    };

    // Filtrando as consultas de acordo com o termo de busca
    const filteredConsultas = consultas.filter(
        consulta =>
            consulta.pet.toLowerCase().includes(searchTerm.toLowerCase()) ||
            consulta.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
            consulta.data.includes(searchTerm) ||
            consulta.hora.includes(searchTerm) ||
            consulta.veterinario.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="cancelar_consulta-container">
            <header className="cancelar_consulta-header">
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
                    <h2 className="main-title">Cancelar Consulta</h2>
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
                        <div className="search-field-container">
                            <SearchIcon className="search-icon" />
                            <input
                                type="text"
                                id="search"
                                placeholder="Buscar pelo nome do Pet ou Tutor"
                                className="search-input"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)} // Atualiza o termo de pesquisa
                            />
                        </div>
                        <div className="cancelar_consulta-form">
                            <h3>Resultados</h3>
                            <table className="consulta-table">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Pet</th>
                                        <th>Cliente</th>
                                        <th>Data</th>
                                        <th>Hora</th>
                                        <th>Veterinário</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredConsultas.map((consulta) => (
                                        <tr
                                            key={consulta.id}
                                            className={selectedAppointmentIds.includes(parseInt(consulta.id)) ? 'selected' : ''}
                                        >
                                            <td>
                                                <input
                                                    type="checkbox"
                                                    checked={selectedAppointmentIds.includes(parseInt(consulta.id))}
                                                    onChange={() => handleCheckboxChange(parseInt(consulta.id))}
                                                />
                                            </td>
                                            <td>{consulta.pet}</td>
                                            <td>{consulta.cliente}</td>
                                            <td>{consulta.data}</td>
                                            <td>{consulta.hora}</td>
                                            <td>{consulta.veterinario}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="button-container">
                                <button
                                    className="btn-cancelar"
                                    onClick={() => navigate('/nova_consulta')}>
                                    Voltar
                                </button>
                                <button
                                    className="btn-cancelar_consulta"
                                    onClick={handleCancelAppointments}>
                                    Cancelar Consultas
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            {/* Exibe a mensagem de sucesso */}
            {showCancelamentoMessage && (
                <div className={`success-message ${showCancelamentoMessage ? 'visible' : ''}`}>
                    {cancelamentoMessage}
                </div>
            )}
        </div>
    );
};

export default Cancelar_Consulta;