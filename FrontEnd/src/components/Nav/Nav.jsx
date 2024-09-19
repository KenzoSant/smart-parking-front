import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';

const Nav = () => {
  return (
    <nav className="nav">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/historico">Historico</Link></li>
        <li><Link to="/mapa">Mapa</Link></li>
        <li><Link to="/perfil">Perfil</Link></li>
      </ul>
    </nav>
  );
};

export default Nav;
