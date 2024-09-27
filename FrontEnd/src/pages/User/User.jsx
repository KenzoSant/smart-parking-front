import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthProvider'; // Certifique-se de ajustar o caminho
import Header from '../../components/Header/Header';
import UserLog from '../../components/UserLog/UserLog';
import UserPage from '../../components/UserPage/UserPage' // Página do usuário logado

import './User.css';

const User = () => {
  const { user } = useContext(AuthContext);
  console.log("Estado do usuário:", user); // Verifique se o usuário está definido

  return (
    <div className='user'>
      <Header />
      <div className="user-container">
        {/* {user ? <UserPage /> : <UserLog />} */}
        <UserPage />
      </div> 
      
    </div>
  );
};

export default User;
