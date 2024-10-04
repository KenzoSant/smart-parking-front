import React from 'react';
import styles from './PaymentPage.module.css';
import { assets } from '../../assets/js/assets';

const PaymentPage = () => {
    return (
        <div>
            <h1 className={styles.title}>Pagamento</h1>
            <div className={styles.container}>

                <img src={assets.img1} alt="North Excelsior District" />

                <div className={styles.fieldcontainer}>
                    <div className={styles.field}>
                        <label>Nome:</label>
                        <p>João da Silva</p>
                    </div>

                    <div className={styles.field}>
                        <label>Nome do Estacionamento:</label>
                        <p>Estacionamento Central</p>
                    </div>

                    <div className={styles.field}>
                        <label>Carro:</label>
                        <p>Gol</p>
                    </div>

                    <div className={styles.field}>
                        <label>Placa:</label>
                        <p>NOP0Q12</p>
                    </div>

                    <div className={styles.field}>
                        <label>Valor:</label>
                        <p>R$ 25,00</p>
                    </div>

                    <button className={styles.submitButton}>Pagar</button>
                </div>

            </div>
        </div>
    );
};

export default PaymentPage;
