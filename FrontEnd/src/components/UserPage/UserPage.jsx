import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../context/AuthProvider';
import './UserPage.css';

const UserPage = () => {
  const { user, logout, createVehicle, vehicles, fetchVehicles } = useContext(AuthContext); // Obtém os veículos do contexto
  const [vehicle, setVehicle] = useState({ make: '', model: '', plate: '', year: '', color: '' });
  const { changePassword, loading, error, success } = useContext(AuthContext);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  useEffect(() => {
    if (user && user.token) {
      fetchVehicles(); 
    }
  }, [user, fetchVehicles]);

  const handleAddVehicle = async () => {
    try {
      await createVehicle(vehicle); // Adiciona o veículo
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
      <div className="user-info">
        <h1>Usuário</h1>
        <div className="user-container-info">
          <h2>Informações do Usuário</h2>
          <p><strong>Nome:</strong> {user ? user.name : 'N/A'}</p>
          <p><strong>Email:</strong> {user ? user.email : 'N/A'}</p>
        </div>
      </div>

      <div className="user-info">
        <h1>Senha</h1>
        <div className="user-container-info">
        <h2>Alterar Senha</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="password"
              placeholder="Senha atual"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Nova senha"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <button className='alterar' type="submit" disabled={loading}>Alterar Senha</button>
          </form>
          {error && <p className="error">{error}</p>}
          {success && <p className="success">{success}</p>}
        </div>
      </div>

      


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

      <div className="add-vehicle">
        <h2>Adicionar Veículo</h2>
        <input
          type="text"
          value={vehicle.make}
          onChange={(e) => setVehicle({ ...vehicle, make: e.target.value })}
          placeholder="Marca"
        />
        <input
          type="text"
          value={vehicle.model}
          onChange={(e) => setVehicle({ ...vehicle, model: e.target.value })}
          placeholder="Modelo"
        />
        <input
          type="text"
          value={vehicle.plate}
          onChange={(e) => setVehicle({ ...vehicle, plate: e.target.value })}
          placeholder="Placa"
        />
        <input
          type="text"
          value={vehicle.year}
          onChange={(e) => setVehicle({ ...vehicle, year: e.target.value })}
          placeholder="Ano"
        />
        <input
          type="text"
          value={vehicle.color}
          onChange={(e) => setVehicle({ ...vehicle, color: e.target.value })}
          placeholder="Cor"
        />
        <button onClick={handleAddVehicle}>Adicionar</button>
      </div>

      <button onClick={logout} className="logout-button">
        Logout
      </button>
    </div>
  );
};

export default UserPage;
