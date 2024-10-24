import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthProvider';
import { FaRegCopy } from 'react-icons/fa'; // Ícone de cópia
import './BookingInfo.css';

const BookingInfo = () => {
  const { user, makePayment } = useContext(AuthContext); // Obtém a função de pagamento do contexto
  const [parkingInfo, setParkingInfo] = useState([]); // Alterado para array
  const [error, setError] = useState(null);
  const [qrCodeUrl, setQrCodeUrl] = useState(null);
  const [qrCodePayload, setQrCodePayload] = useState(null);
  const [isLoadingQrCode, setIsLoadingQrCode] = useState(false);
  const [copySuccess, setCopySuccess] = useState(''); // Mensagem de cópia
  const [isPaymentConfirmed, setIsPaymentConfirmed] = useState(false); // Estado para verificar se o pagamento foi confirmado

  useEffect(() => {
    if (user) {
      const eventSource = new EventSource(`http://localhost:8080/api/v1/parking-records/${user.id}`);

      eventSource.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log('Dados recebidos do SSE:', data);
        if (Array.isArray(data) && data.length > 0) {
          setParkingInfo(data); // Define a lista de carros no estado
        } else {
          setParkingInfo([]);
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

  if (parkingInfo.length === 0) {
    return (
      <div className="booking-info">
        <div>Sem estacionamentos...</div>
      </div>
    );
  }

  // Função para gerar o QR Code ao clicar no botão de pagamento
  const handleGenerateQrCode = async (plate) => {
    setIsLoadingQrCode(true);
    try {
      const response = await axios.post('http://localhost:5000/gerar_qrcode', {
        valor: '00.01', // Exemplo de valor, você pode atualizar conforme necessário
        id_usuario: user.id,
      });

      const { url_qrcode, payload } = response.data; // Recebe a URL e o payload do QR Code
      setQrCodeUrl(url_qrcode);
      setQrCodePayload(payload); // Armazena o payload
    } catch (err) {
      console.error('Erro ao gerar QR Code:', err);
    } finally {
      setIsLoadingQrCode(false);
    }
  };

  // Função para confirmar o pagamento
  const handleConfirmPayment = async (plate) => {
    try {
      const paymentData = { plate };
      console.log('Dados enviados para o pagamento:', paymentData);

      await makePayment(plate); // Chama a função para efetuar o pagamento usando a placa do veículo
      setIsPaymentConfirmed(true); // Marca o pagamento como confirmado
      setQrCodeUrl(null); // Remove o QR Code após o pagamento
      //alert('Pagamento confirmado com sucesso!'); // Alerta o usuário
    } catch (err) {
      console.error('Erro ao confirmar pagamento:', err);
      alert('Erro ao confirmar pagamento.');
    }
  };

  // Função para copiar o payload do QR Code
  const handleCopyPayload = () => {
    navigator.clipboard.writeText(qrCodePayload).then(() => {
      setCopySuccess('Copiado!'); // Exibe a mensagem de sucesso ao copiar
      setTimeout(() => setCopySuccess(''), 2000); // Limpa a mensagem após 2 segundos
    }).catch(err => {
      console.error('Erro ao copiar:', err);
    });
  };

  return (
    <div>
      {parkingInfo.map((carInfo, index) => {
        const { parking, entry_time, plate, current_amount } = carInfo;

        // Formatar a hora de entrada
        const formattedEntryTime = entry_time
          ? new Date(entry_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          : 'Horário inválido';

        return (
          <div key={index} className="booking-info">
            <div className="booking-local">
              <p><strong>{parking || 'Local não disponível'}</strong></p>
            </div>
            
            <div className="booking-content">
              <div className="booking-time">
                <span>Entrada:</span>
                <p><strong>{formattedEntryTime}</strong></p>
              </div>

              <div className="booking-time">
                <span>Placa:</span>
                <p><strong>{plate || 'Placa não disponível'}</strong></p>
              </div>

              <div className="booking-time">
                <span>Valor:</span>
                <p><strong>R${current_amount || 'Valo não disponível'}</strong></p>
              </div>
            </div>

            <button className="find-location-btn" onClick={() => handleGenerateQrCode(plate)} disabled={isLoadingQrCode || isPaymentConfirmed}>
              {isLoadingQrCode ? 'Gerando QR Code...' : 'Pagamento'}
            </button>

            {qrCodeUrl && (
              <div className="qr-code-container">
                <img src={qrCodeUrl} alt="QR Code para pagamento" />
                <div className="booking-time cod">
                  <span><strong>Código:</strong> {qrCodePayload?.slice(0, 10)}... {/* Exibe apenas os primeiros 10 caracteres */}</span>
                  <button className="copy-payload-btn" onClick={handleCopyPayload}>
                    <FaRegCopy /> {/* Ícone de cópia */}
                  </button>
                  {copySuccess && <span className="copy-success">{copySuccess}</span>} {/* Mensagem de sucesso */}
                </div>

                {/* Botão de Confirmar Pagamento */}
                <button className="find-location-btn" onClick={() => handleConfirmPayment(plate)} disabled={isPaymentConfirmed}>
                  {isPaymentConfirmed ? 'Pagamento Confirmado' : 'Confirmar Pagamento'}
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default BookingInfo;
