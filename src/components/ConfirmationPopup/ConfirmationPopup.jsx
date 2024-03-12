import React from 'react';
import styles from "./confirmation.module.scss";

const ConfirmationPopup = ({ isOpen, onClose, onConfirm, message }) => {
    if (!isOpen) return null;

    return (
        <div className={styles.popupContainer}>
            <p className={styles.title}>Are you sure?</p>
            <p className={styles.message}>{message}</p>
            <button onClick={onConfirm} className={styles.button}><span>Yes</span></button>
            <button onClick={onClose} className={styles.button}><span>No</span></button>
        </div>
    );
};

export default ConfirmationPopup;