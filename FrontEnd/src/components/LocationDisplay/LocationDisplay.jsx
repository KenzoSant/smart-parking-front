import React from 'react';
import './LocationDisplay.css';
import { assets } from '../../assets/js/assets';

const LocationDisplay = () => {
  return (
    <div className="location-display">
      <h3>Parkir disini lagi, Yuk!</h3>
      <div className="location">
        <img src={assets.img1} alt="North Excelsior District" />
        <div className="location-info">
          <h4>North Excelsior District</h4>
          <p>Jalan Soedirman 23 Barat</p>
          <p>8 Slot Tersedia - <strong>$5000/jam</strong></p>
        </div>
      </div>

      <div className="location">
        <img src={assets.img2} alt="Manila Oriental Mall" />
        <div className="location-info">
          <h4>Manila Oriental Mall</h4>
          <p>Jalan Karet 210 Timur</p>
          <p>12 Slot Tersedia - <strong>$6000/jam</strong></p>
        </div>
      </div>
    </div>
  );
};

export default LocationDisplay;
