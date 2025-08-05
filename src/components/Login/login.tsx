import React, { useState } from 'react';
import './login.css';

interface LoginProps {
  onLogin: (isSuccess: boolean) => void;
}

interface LoginFormState {
  username: string;
  password: string;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [formData, setFormData] = useState<LoginFormState>({
    username: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Exemplo de lógica de autenticação
    if (formData.username === 'admin' && formData.password === '123') {
      onLogin(true); // Chama a prop com sucesso
    } else {
      alert('Usuário ou senha incorretos.');
      onLogin(false); // Chama a prop com falha
    }
  };

  return (
    <div className="login-page-split">
      <div className="login-left">
        <div className="logo-container">
          <img src="/Images/logo.png" alt="Logo da Clínica Veterinária" className="logo" />
          <h1 className="clinic-name">VETERINÁRIA<br />FRANCISCO</h1>
        </div>
      </div>
      <div className="login-right">
        <div className="login-box-split">
          <h1 className="welcome-text-split"><strong>Bem-Vindo!</strong></h1>
          <form onSubmit={handleSubmit}>
            <div className="user-section">
              <div className="input-group-split">
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Usuário"
                  required
                />
              </div>
            </div>
            <div className="password-section">
              <div className="input-group-split">
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Senha"
                  required
                />
              </div>
            </div>
            <div className="forgot-password-split">
              <a href="#">Esqueceu a senha?</a>
            </div>
            <button type="submit" className="login-button-split">
              Entrar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;