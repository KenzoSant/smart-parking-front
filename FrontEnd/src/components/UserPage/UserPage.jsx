import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthProvider'; // Ajuste o caminho
import './UserPage.css';

const UserPage = () => {
  const { user, logout } = useContext(AuthContext); // Extraindo a função logout do contexto
  const [vehicle, setVehicle] = useState('');

  const handleAddVehicle = () => {
    console.log("Veículo adicionado:", vehicle);
    setVehicle('');
  };

  return (
    <div>
      <h1>Bem-vindo, {user ? user.name : 'Usuário'}</h1>
      <div className="add-vehicle">
        <h2>Adicionar Veículo</h2>
        <input 
          type="text" 
          value={vehicle} 
          onChange={(e) => setVehicle(e.target.value)} 
          placeholder="Nome do veículo" 
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
