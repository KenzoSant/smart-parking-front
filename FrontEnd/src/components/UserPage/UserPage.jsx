import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../context/AuthProvider';
import axios from 'axios';
import './UserPage.css';

const UserPage = () => {
  const { user, logout, createVehicle, vehicles, fetchVehicles, changePassword, loading, error, success } = useContext(AuthContext);
  const [vehicle, setVehicle] = useState({ make: '', model: '', plate: '', year: '', color: '' });
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const { fetchColors, fetchMakes, colors, makes } = useContext(AuthContext);

  //Busca ao montar, problema do f5
  useEffect(() => {
    fetchVehicles();
    fetchColors(); 
    fetchMakes(); 
  }, []);

  const handleAddVehicle = async () => {
    try {
      await createVehicle(vehicle);
      setVehicle({ make: '', model: '', plate: '', year: '', color: '' });
    } catch (error) {
      console.error('Erro ao adicionar veículo:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    changePassword(currentPassword, newPassword);
  };

  return (
    <div className="user-page">
      {/* Informações do usuário */}
      <div className="user-info">
        <h1>Usuário</h1>
        <div className="user-container-info">
          <h2>Informações do Usuário</h2>
          <p><strong>Nome:</strong> {user?.name || 'N/A'}</p>
          <p><strong>Email:</strong> {user?.sub || 'N/A'}</p>
        </div>
      </div>

      {/* Alterar senha */}
      <div className="user-info">
        <h1>Senha</h1>
        <div className="user-container-info">
          <h2>Alterar Senha</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="password"
              placeholder="Senha atual"
              value={currentPassword}
              required
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Nova senha"
              value={newPassword}
              required
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <button className='alterar' type="submit" disabled={loading}>Alterar Senha</button>
          </form>
          {error && <p className="error">{error}</p>}
          {success && <p className="success">{success}</p>}
        </div>
      </div>

      {/* Exibir veículos */}
      <div className="user-info">
        <h1>Carros</h1>
        <div className="user-container-info">
          <h2>Informações dos Carros</h2>
          {vehicles.length > 0 ? (
            vehicles.map((v, index) => (
              <div key={index} className="vehicle-block">
                <p><strong>Marca:</strong> {v.make}</p>
                <p><strong>Modelo:</strong> {v.model}</p>
                <p><strong>Placa:</strong> {v.plate}</p>
                <p><strong>Ano:</strong> {v.year}</p>
                <p><strong>Cor:</strong> {v.color}</p>
              </div>
            ))
          ) : (
            <p>Nenhum veículo cadastrado.</p>
          )}
        </div>
      </div>

      {/* Formulário para adicionar veículo */}
      <div className="add-vehicle">
        <h2>Adicionar Veículo</h2>
        <select
          value={vehicle.make}
          required
          onChange={(e) => setVehicle({ ...vehicle, make: e.target.value })}
        >
          <option value="">Selecione a marca</option>
          {makes.map((make, index) => (
            <option key={index} value={make.name}>{make.name}</option>
          ))}
        </select>
        <input
          type="text"
          value={vehicle.model}
          required
          onChange={(e) => setVehicle({ ...vehicle, model: e.target.value })}
          placeholder="Modelo"
        />
        <input
          type="text"
          value={vehicle.plate}
          onChange={(e) => setVehicle({ ...vehicle, plate: e.target.value.toUpperCase() })}
          placeholder="Placa"
        />

        <input
          type="text"
          value={vehicle.year}
          required
          onChange={(e) => setVehicle({ ...vehicle, year: e.target.value })}
          placeholder="Ano"
        />
        <select
          value={vehicle.color}
          required
          onChange={(e) => setVehicle({ ...vehicle, color: e.target.value })}
        >
          <option value="">Selecione a cor</option>
          {colors.map((color, index) => (
            <option key={index} value={color.name}>{color.name}</option>
          ))}
        </select>
        {success && <p className="success">{success}</p>}
        <button onClick={handleAddVehicle}>Adicionar</button>
      </div>

      <button onClick={logout} className="logout-button">
        Logout
      </button>
    </div>
  );
};

export default UserPage;
