import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthProvider';
import { useNavigate } from 'react-router-dom';  
import styles from '../UserLog/UserLog.module.css'; 

const ForgotPassword = () => {
  const { resetPassword, loading, error, success } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const navigate = useNavigate();  

  const handleSubmit = (e) => {
    e.preventDefault();
    resetPassword(email);
  };

  const handleBackToLogin = () => {
    navigate('/');  
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Esqueceu a Senha?</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.formGroup}>Digite seu email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.input}
        />
        <button type="submit" disabled={loading} className={styles.submitButton}>
          {loading ? 'Enviando...' : 'Enviar'}
        </button>
      </form>
      {error && <p className={styles.error}>{error}</p>}
      {success && <p className={styles.success}>{success}</p>}

      {/* Botão para voltar ao login */}
      <button className={styles.toggleButton} onClick={handleBackToLogin}>
        Voltar ao Login
      </button>
    </div>
  );
};

export default ForgotPassword;
