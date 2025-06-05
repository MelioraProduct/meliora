import React from 'react';
import styles from '../../pages/style.module.css';

const CancelOrder = ({ order, onConfirm, onCancel }) => {
    return (
        <div className={styles.alertBackground}>
            <div className={styles.confirmationAlert}>
                <h2>Cancel Order</h2>
                <p>
                    Are you sure you want to Cancel Order <strong>{order._id}</strong>?
                </p>
                <div className={styles.alertActions}>
                    <button className={styles.confirmBtn} onClick={onConfirm}>Yes</button>
                    <button className={styles.cancelBtn} onClick={onCancel}>No</button>
                </div>
            </div>
        </div>
    );
};

export default CancelOrder;