import React from 'react';
import '../LocationDisplay/LocationDisplay.css';
import { assets } from '../../assets/js/assets';

const LocationDisplay = () => {
  return (
    <div className="location-display">
      <h1>Estacionamentos utilizados</h1>
      <div className="location">
        <img src={assets.img1} alt="North Excelsior District" />
        <div className="location-info">
          <h3>Estabelecimento</h3><br />
          <p>Valor Pago - <strong>R$50</strong></p>
          <p>Carro - <strong>Fiat</strong></p>
        </div>
      </div>

      <div className="location">
        <img src={assets.img2} alt="Manila Oriental Mall" />
        <div className="location-info">
          <h3>Estabelecimento</h3><br />
          <p>Valor Pago - <strong>R$60</strong></p>
          <p>Carro - <strong>Fiat</strong></p>
        </div>
      </div>

      <div className="location">
        <img src={assets.img3} alt="Center Mall" />
        <div className="location-info">
          <h3>Estabelecimento</h3><br />
          <p>Valor Pago - <strong>R$30</strong></p>
          <p>Carro - <strong>Fiat</strong></p>
        </div>
      </div>

      <div className="location">
        <img src={assets.img4} alt="Mc Donalds" />
        <div className="location-info">
          <h3>Estabelecimento</h3> <br />
          <p>Valor Pago - <strong>R$35</strong></p>
          <p>Carro - <strong>Fiat</strong></p>
        </div>
      </div>
    </div>
  );
};

export default LocationDisplay;
