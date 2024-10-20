import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../context/AuthProvider'; 
import styles from './UserLog.module.css';
import { useNavigate } from 'react-router-dom';  

const UserLog = () => {
  const { login, register, loading, clearMessages, loginMessages, registerMessages } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLogin, setIsLogin] = useState(true); 
  const navigate = useNavigate();

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setEmail('');
    setPassword('');
    setName('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      login(email, password);
    } else {
      register(name, email, password);
    }
  };

  useEffect(() => {
    clearMessages(isLogin ? 'login' : 'register');
  }, [isLogin]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{isLogin ? 'Login' : 'Cadastro'}</h1>

      <form className={styles.form} onSubmit={handleSubmit}>
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

      {isLogin && loginMessages.success && <div className="success">{loginMessages.success}</div>}
      {isLogin && loginMessages.error && <div className="error">{loginMessages.error}</div>}

      {!isLogin && registerMessages.success && <div className="success">{registerMessages.success}</div>}
      {!isLogin && registerMessages.error && <div className="error">{registerMessages.error}</div>}

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
