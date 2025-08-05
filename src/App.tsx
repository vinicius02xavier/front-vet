import React, { useState } from 'react';
import Login from './components/Login/login'; 
import Dashboard from './components/Dashboard/dashboard'; 
import './App.css'; 

const App: React.FC = () => {
  // O estado 'isAuthenticated' será usado para controlar qual tela mostrar
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Função para simular o login
  const handleLogin = (isSuccess: boolean) => {
    if (isSuccess) {
      setIsAuthenticated(true);
    }
  };

  // Função para simular o logout
  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <div className="App">
      {isAuthenticated ? (
        // Se autenticado, mostra o Dashboard
        <Dashboard onLogout={handleLogout} /> 
      ) : (
        // Se não autenticado, mostra a tela de Login
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;