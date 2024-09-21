import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Payment from './pages/Payment/Payment';
import Nav from './components/Nav/Nav';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pagar" element={<Payment />} />
        </Routes>
        {/* Menu de navegação */}
        <Nav />
      </div>
    </Router>
  );
}

export default App;