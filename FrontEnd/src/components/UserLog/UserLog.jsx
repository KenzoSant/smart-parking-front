import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthProvider'; // Ajuste o caminho se necessário
import styles from './UserLog.module.css'; // Importação correta dos estilos

const UserLog = () => {
  const { login, register, error, loading, success } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLogin, setIsLogin] = useState(true); // Estado para alternar entre login e cadastro

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
    </div>
  );
};

export default UserLog;
