import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home/Home';
import Payment from './pages/Payment/Payment';
import History from './pages/History/History';
import User from './pages/User/User';
import Nav from './components/Nav/Nav';
import { AuthContext } from './context/AuthProvider'; // Certifique-se de importar o contexto de autenticação
import UserLog from './components/UserLog/UserLog'; // Componente de Login

function App() {
  const { user } = useContext(AuthContext); // Verifica se o usuário está autenticado

  if (!user) {
    // Se o usuário não estiver logado, exibe a página de login por cima de tudo
    return <UserLog />;
  }

  return (
    <div>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/pagar" element={<Payment />} />
        <Route path="/historico" element={<History />} />
        <Route path="/perfil" element={<User />} />
      </Routes>
      <Nav />
    </div>
  );
}

export default App;
