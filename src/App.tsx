import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login/login';
import Dashboard from './components/Dashboard/dashboard';
import Relatorios from './components/Relatorios/relatorios';
import './App.css';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // handleLogin e handleLogout agora apenas atualizam o estado de autenticação.
  // A navegação será feita dentro dos componentes Login e Dashboard.
  const handleLogin = (isSuccess: boolean) => {
    if (isSuccess) {
      setIsAuthenticated(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <Router> {/* O Router deve envolver toda a sua aplicação */}
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

          {/* Redirecionar qualquer outra rota para o login se não estiver autenticado */}
          {!isAuthenticated && <Route path="*" element={<Navigate to="/login" replace />} />}
        </Routes>
      </div>
    </Router>
  );
};

export default App;