import React from 'react';
import styles from '../../pages/style.module.css';

const DeleteOrder = ({ order, onConfirm, onCancel }) => {
    return (
        <div className={styles.alertBackground}>
            <div className={styles.confirmationAlert}>
                <h2>Delete Order</h2>
                <p>
                    Are you sure you want to Delete Order <strong>{order._id}</strong>?
                </p>
                <div className={styles.alertActions}>
                    <button className={styles.confirmBtn} onClick={onConfirm}>Yes</button>
                    <button className={styles.cancelBtn} onClick={onCancel}>No</button>
                </div>
            </div>
        </div>
    );
};

export default DeleteOrder;