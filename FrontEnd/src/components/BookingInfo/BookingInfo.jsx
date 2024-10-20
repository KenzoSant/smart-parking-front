import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthProvider';
import './BookingInfo.css';

const BookingInfo = () => {
  const { user } = useContext(AuthContext);
  const [parkingInfo, setParkingInfo] = useState(null);
  const [error, setError] = useState(null);
  const [qrCodeUrl, setQrCodeUrl] = useState(null);
  const [isLoadingQrCode, setIsLoadingQrCode] = useState(false);

  useEffect(() => {
    if (user) {
      const eventSource = new EventSource(`http://localhost:8080/api/v1/parking-records/${user.id}`);

      eventSource.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log('Dados recebidos do SSE:', data);
        if (Array.isArray(data) && data.length > 0) {
          setParkingInfo(data[0]);
        } else {
          setParkingInfo(null);
        }
      };

      eventSource.onerror = (err) => {
        console.error('Erro ao conectar com SSE:', err);
        setError('Erro ao conectar com o servidor.');
        eventSource.close();
      };

      return () => {
        eventSource.close();
      };
    }
  }, [user]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!parkingInfo) {
    return <div>Carregando...</div>;
  }

  const { parking, entry_time, plate } = parkingInfo;

  // Formatar a hora de entrada
  const formattedEntryTime = entry_time
    ? new Date(entry_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    : 'Horário inválido';

  // Função para gerar o QR Code ao clicar no botão de pagamento
  const handleGenerateQrCode = async () => {
    setIsLoadingQrCode(true);
    try {
      const response = await axios.post('http://localhost:5000/gerar_qrcode', {
        valor: '00.01', // Exemplo de valor, você pode atualizar conforme necessário
        id_usuario: user.id,
      });

      const { url_qrcode } = response.data; 
      setQrCodeUrl(url_qrcode);
    } catch (err) {
      console.error('Erro ao gerar QR Code:', err);
    } finally {
      setIsLoadingQrCode(false);
    }
  };

  return (
    <div className="booking-info">
      <div className="booking-content">
        <div className="booking-time">
          <span>{parking || 'Local não disponível'}</span>
          <p>Entrada: <strong>{formattedEntryTime}</strong></p>
        </div>

        <div className="booking-time">
          <span>Placa</span>
          <p><strong>{plate || 'Placa não disponível'}</strong></p>
        </div>
      </div>

      <button className="find-location-btn" onClick={handleGenerateQrCode} disabled={isLoadingQrCode}>
        {isLoadingQrCode ? 'Gerando QR Code...' : 'Pagamento'}
      </button>

      {qrCodeUrl && (
        <div className="qr-code-container">
          <img src={qrCodeUrl} alt="QR Code para pagamento" />
        </div>
      )}
    </div>
  );
};

export default BookingInfo;
