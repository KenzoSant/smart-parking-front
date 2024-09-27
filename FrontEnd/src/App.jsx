import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Payment from './pages/Payment/Payment';
import History from './pages/History/History';
import User from './pages/User/User';
import Nav from './components/Nav/Nav';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pagar" element={<Payment />} />
        <Route path="/historico" element={<History />} />
        <Route path="/perfil" element={<User />} />
        
      </Routes>
      <Nav />
    </div>
  );
}

export default App;
