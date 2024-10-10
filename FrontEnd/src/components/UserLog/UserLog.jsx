import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthProvider'; 
import styles from './UserLog.module.css';
import { useNavigate } from 'react-router-dom';  

const UserLog = () => {
  const { login, register, error, loading, success } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLogin, setIsLogin] = useState(true); 
  const navigate = useNavigate();

  // Função para alternar entre Login e Cadastro
  const toggleForm = () => {
    setIsLogin(!isLogin);
    setEmail('');
    setPassword('');
    setName('');
  };

  // Função para manipular o submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      handleLogin();
    } else {
      handleRegister();
    }
  };

  // Função para login
  const handleLogin = () => {
    login(email, password);
  };

  // Função para cadastro
  const handleRegister = () => {
    register(name, email, password);
  };
  

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{isLogin ? 'Login' : 'Cadastro'}</h1>

      <form className={styles.form} onSubmit={handleSubmit}>
        {/* Se não for login, exibe o campo de nome */}
        {!isLogin && (
          <div className={styles.formGroup}>
            <label htmlFor="name">Nome</label>
            <input
              type="text"
              id="name"
              className={styles.input}
              placeholder="Digite seu nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        )}

        <div className={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            required
            className={styles.input}
            placeholder="Digite seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            id="password"
            required
            className={styles.input}
            placeholder="Digite sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" className={styles.submitButton} disabled={loading}>
          {loading ? 'Carregando...' : isLogin ? 'Entrar' : 'Cadastrar'}
        </button>
      </form>

      {error && <p className={styles.error}>{error}</p>}
      {success && <p className={styles.success}>{success}</p>}

      <button className={styles.toggleButton} onClick={toggleForm}>
        {isLogin ? 'Não tem uma conta? Cadastre-se' : 'Já tem uma conta? Faça Login'}
      </button>

      <button className={styles.toggleButton} onClick={() => navigate('/forgot-password')}>
        Esqueceu a senha?
      </button>

    </div>
  );
};

export default UserLog;
