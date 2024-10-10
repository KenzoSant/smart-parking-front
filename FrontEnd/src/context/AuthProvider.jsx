import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem('token');
    return token ? jwtDecode(token) : null; 
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [vehicles, setVehicles] = useState([]);
  const [colors, setColors] = useState([]);
  const [makes, setMakes] = useState([]);
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
        const decodedToken = jwtDecode(token);
        setUser(decodedToken);
        console.log('Usuário decodificado:', decodedToken);

        await fetchVehicles();
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
    navigate('/');
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
      setVehicles(response.data);
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

  // Função para buscar cores
  const fetchColors = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get('http://localhost:8080/api/v1/colors', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setColors(response.data);
    } catch (error) {
      console.error('Erro ao buscar cores:', error);
    }
  };

  // Função para buscar modelos
  const fetchMakes = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get('http://localhost:8080/api/v1/makecars', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMakes(response.data);
    } catch (error) {
      console.error('Erro ao buscar masrcas:', error);
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
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar histórico de estacionamento:', error);
      throw error;
    }
  };

  //Função para resetar senha
  const resetPassword = async (email) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const response = await axios.post('http://localhost:8080/api/v1/auth/reset-password', { email });
      setSuccess('Um email de redefinição de senha foi enviado.');
    } catch (error) {
      setError('Erro ao enviar o email de redefinição de senha.');
    } finally {
      setLoading(false);
    }
  };

  // Função para alterar senha
  const changePassword = async (currentPassword, newPassword) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        'http://localhost:8080/api/v1/auth/change-password',
        { currentPassword, newPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSuccess('Senha alterada com sucesso.');
    } catch (error) {
      setError('Erro ao alterar a senha.');
    } finally {
      setLoading(false);
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
      fetchColors,
      fetchMakes,
      fetchParkingHistory,
      resetPassword,
      changePassword,
      vehicles,
      colors,
      makes,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
