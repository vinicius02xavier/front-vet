import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login/login';
import Dashboard from './components/Dashboard/dashboard';
import Relatorios from './components/Relatorios/relatorios';
import Nova_Consulta from './components/Agendamento/nova_consulta';
import Remarcar_Consulta from './components/Agendamento/remarcar_consulta';
import './App.css';
import Cadastro_Cliente from './components/Cadastro/cadastro_cliente';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const handleLogin = (isSuccess: boolean) => {
    if (isSuccess) {
      setIsAuthenticated(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <Router> 
      <div className="App">
        <Routes>
          {/* Rota para o Login */}
          <Route path="/login" element={<Login onLogin={handleLogin} />} />

          {/* Rotas Protegidas: Só acessíveis se isAuthenticated for true */}
          <Route
            path="/"
            element={isAuthenticated ? <Dashboard onLogout={handleLogout} /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/relatorios"
            element={isAuthenticated ? <Relatorios onLogout={handleLogout} /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/nova_consulta"
            element={isAuthenticated ? <Nova_Consulta onLogout={handleLogout} /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/remarcar_consulta"
            element={isAuthenticated ? <Remarcar_Consulta onLogout={handleLogout} /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/cadastro_cliente"
            element={isAuthenticated ? <Cadastro_Cliente onLogout={handleLogout} /> : <Navigate to="/login" replace />}
          />

          {/* Redirecionar qualquer outra rota para o login se não estiver autenticado */}
          {!isAuthenticated && <Route path="*" element={<Navigate to="/login" replace />} />}
        </Routes>
      </div>
    </Router>
  );
};

export default App;