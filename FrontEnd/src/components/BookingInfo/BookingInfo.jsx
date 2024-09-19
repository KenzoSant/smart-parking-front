import React from 'react';
import './BookingInfo.css';

const BookingInfo = () => {
  return (
    <div className="booking-info">
      <div className="booking-time">
        <span>Kedatangan</span>
        <p>Hari ini, <strong>10.30</strong></p>
      </div>
      <div className="booking-time">
        <span>Diambil</span>
        <p>Besok, <strong>09.30</strong></p>
      </div>
      <button className="find-location-btn">Cari Tempat</button>
    </div>
  );
};

export default BookingInfo;
