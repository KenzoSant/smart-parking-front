import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem('token');
    return token ? { token } : null; // Se tiver token, retorna um objeto de usuário
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Função para buscar os dados do usuário com base no token
  const fetchUserData = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data); // Armazena os dados do usuário
        localStorage.setItem('user', JSON.stringify(response.data)); // Armazena no localStorage
      } catch (err) {
        console.error('Erro ao buscar dados do usuário:', err);
      }
    }
  };

  // Função para login
  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post('http://localhost:8080/api/v1/auth/login', {
        email,
        password,
      });
      const token = response.data.token; // Armazena o token
      localStorage.setItem('token', token); // Armazena o token no localStorage
      console.log("Resposta da API:", response.data);

      // Busca os dados do usuário após o login
      await fetchUserData(); 

      navigate('/perfil');
    } catch (err) {
      setError(err.response ? err.response.data.message : 'Erro no login');
    } finally {
      setLoading(false);
    }
  };

  // Função para registro
  const register = async (name, email, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post('http://localhost:8080/api/v1/auth/register', {
        name,
        email,
        password,
      });
      const token = response.data.token; // Armazena o token
      localStorage.setItem('token', token); // Armazena o token no localStorage

      // Busca os dados do usuário após o registro
      await fetchUserData();

      navigate('/perfil');
    } catch (err) {
      setError(err.response ? err.response.data.message : 'Erro no cadastro');
    } finally {
      setLoading(false);
    }
  };

  // Função para logout
  const logout = () => {
    setUser(null); // Limpa o estado do usuário
    localStorage.removeItem('token'); // Remove o token do localStorage
    localStorage.removeItem('user'); // Remove o usuário do localStorage
    navigate('/'); // Redireciona para a página inicial
  };

  // Efeito para verificar o token na inicialização
  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    if (token) {
      if (user) {
        try {
          setUser(JSON.parse(user)); // Configura o usuário a partir do localStorage
        } catch (e) {
          console.error('Erro ao analisar o usuário:', e); // Trate erros de análise
        }
      } else {
        // Se houver token, busque os dados do usuário
        fetchUserData();
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, error, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
