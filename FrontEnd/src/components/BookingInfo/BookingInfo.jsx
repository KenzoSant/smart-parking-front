import React from 'react';
import './BookingInfo.css';

const BookingInfo = () => {
  return (
    <div className="booking-info">
      <div className="booking-content">
        <div className="booking-time">
          <span>Local Atual</span>
          <p>Entrada <strong>00:00</strong></p>
        </div>
        <div className="booking-time">
          <span>Local Atual</span>
          <p>Saida <strong>00:00</strong></p>
        </div>
      </div>
      
      <button className="find-location-btn">Pagamento</button>
    </div>
  );
};

export default BookingInfo;
