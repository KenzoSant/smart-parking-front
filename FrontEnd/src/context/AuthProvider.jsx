import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem('token');
    return token ? { token } : null;
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [vehicles, setVehicles] = useState([]); // Estado dos veículos
  const navigate = useNavigate();

  // Função para login
  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const response = await axios.post('http://localhost:8080/api/v1/auth/login', { email, password });
      const token = response.data.token;
  
      if (token) {
        localStorage.setItem('token', token);
        await fetchUserData(); // Buscar dados do usuário
        await fetchVehicles();  // Buscar veículos logo após o login
  
        setSuccess('Login efetuado com sucesso!');
        navigate('/home');
      } else {
        setError('Erro: Token não foi retornado.');
      }
    } catch (err) {
      setError('Email ou senha incorretos.');
    } finally {
      setLoading(false);
    }
  };

  // Função para registro
  const register = async (name, email, password) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const response = await axios.post('http://localhost:8080/api/v1/auth/register', { name, email, password });
      const token = response.data.token;
      localStorage.setItem('token', token);

      await fetchUserData();
      setSuccess('Cadastro efetuado com sucesso!');
    } catch (err) {
      setError(err.response ? err.response.data.message : 'Erro no cadastro');
    } finally {
      setLoading(false);
    }
  };

  // Função para logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchUserData();
    }
  }, []);

  // Função para buscar os dados do usuário
  const fetchUserData = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/users/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
        localStorage.setItem('user', JSON.stringify(response.data));
      } catch (err) {
        console.error('Erro ao buscar dados do usuário:', err);
      }
    }
  };

  // Função para buscar veículos
  const fetchVehicles = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get('http://localhost:8080/api/v1/vehicles', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setVehicles(response.data); // Atualiza o estado dos veículos
    } catch (error) {
      console.error('Erro ao buscar veículos:', error);
    }
  };

  // Função para adicionar veículo
  const createVehicle = async (vehicleData) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post('http://localhost:8080/api/v1/vehicles', vehicleData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      await fetchVehicles(); // Atualiza a lista de veículos após adicionar
      return response.data;
    } catch (error) {
      console.error('Erro ao criar veículo:', error);
      throw error;
    }
  };

  // Função para buscar o histórico de estacionamento
  const fetchParkingHistory = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get('http://localhost:8080/api/v1/parking-records/history', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data; // Retorna o histórico de estacionamento
    } catch (error) {
      console.error('Erro ao buscar histórico de estacionamento:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      success,
      error,
      login,
      register,
      logout,
      fetchVehicles,
      createVehicle,
      fetchParkingHistory, // Função restaurada para buscar histórico de estacionamento
      vehicles,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
