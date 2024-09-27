import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthProvider'; // Ajuste o caminho
import './UserPage.css';

const UserPage = () => {
  const { user, logout } = useContext(AuthContext); // Extraindo a função logout do contexto
  const [vehicle, setVehicle] = useState({ name: '', plate: '', color: '' });

  const handleAddVehicle = () => {
    console.log("Veículo adicionado:", vehicle);
    setVehicle({ name: '', plate: '', color: '' });
  };

  return (
    <div className="user-page">
        
      <div className="user-info">
        <h1>Usuário</h1>
        <div className="user-container-info">
        <h2>Informações do Usuário</h2>
          <p><strong>Nome:</strong> {user ? user.name : 'N/A'}</p>
          <p><strong>Email:</strong> {user ? user.email : 'N/A'}</p>
          <p><strong>Endereço:</strong> {user ? user.address || 'Endereço não cadastrado' : 'N/A'}</p>
        </div>
      </div>

      <div className="add-vehicle">
        <h2>Adicionar Veículo</h2>
        <input 
          type="text" 
          value={vehicle.name} 
          onChange={(e) => setVehicle({ ...vehicle, name: e.target.value })} 
          placeholder="Nome do Veículo" 
        />
        <input 
          type="text" 
          value={vehicle.plate} 
          onChange={(e) => setVehicle({ ...vehicle, plate: e.target.value })} 
          placeholder="Placa" 
        />
        <input 
          type="text" 
          value={vehicle.color} 
          onChange={(e) => setVehicle({ ...vehicle, color: e.target.value })} 
          placeholder="Cor" 
        />
        <button onClick={handleAddVehicle}>Adicionar</button>
      </div>

      {/* Botão de Logout */}
      <button onClick={logout} className="logout-button">
        Logout
      </button>
    </div>
  );
};

export default UserPage;
