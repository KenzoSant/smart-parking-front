import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Nav from './components/Nav/Nav';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        {/* Menu de navegação */}
        <Nav />
      </div>
    </Router>
  );
}

export default App;