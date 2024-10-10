import React from 'react';
import styles from './PaymentPage.module.css';
import { assets } from '../../assets/js/assets';

const PaymentPage = () => {
    return (
        <div>
            <h1 className={styles.title}>Pagamentos</h1>
            <div className={styles.container}>
                <div className={styles.container_pay}>
                    <img src={assets.img1} alt="Estacionamento 1" />
                    <div className={styles.fieldcontainer}>
                        {/* <div className={styles.field}>
                            <label>Nome:</label>
                            <p>Mateus Santos</p>
                        </div> */}
                        <div className={styles.field}>
                            <label>Estacionamento:</label>
                            <p>Estacionamento Central</p>
                        </div>
                        {/* <div className={styles.field}>
                            <label>Carro:</label>
                            <p>Gol</p>
                        </div>
                        <div className={styles.field}>
                            <label>Placa:</label>
                            <p>NOP0Q12</p>
                        </div> */}
                        <div className={styles.field}>
                            <label>Valor:</label>
                            <p>R$ 25,00</p>
                        </div>
                        <button className={styles.submitButton}>Pagar</button>
                    </div>
                </div>

                <div className={styles.container_pay}>
                    <img src={assets.img2} alt="Estacionamento 2" />
                    <div className={styles.fieldcontainer}>
                        {/* <div className={styles.field}>
                            <label>Nome:</label>
                            <p>Mateus Santos</p>
                        </div> */}
                        <div className={styles.field}>
                        <label>Estacionamento:</label>
                            <p>Estacionamento Sul</p>
                        </div>
                        {/* <div className={styles.field}>
                            <label>Carro:</label>
                            <p>Fiat Uno</p>
                        </div>
                        <div className={styles.field}>
                            <label>Placa:</label>
                            <p>XYZ1A23</p>
                        </div> */}
                        <div className={styles.field}>
                            <label>Valor:</label>
                            <p>R$ 30,00</p>
                        </div>
                        {/* <button className={styles.submitButton}>Pagar</button> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentPage;
