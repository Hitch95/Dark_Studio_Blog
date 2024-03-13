import React, { forwardRef } from 'react';
import styles from "./confirmation.module.scss";

const ConfirmationPopup = forwardRef(({ isOpen, onClose, onConfirm, message }, ref) => {
  if (!isOpen) return null;

  return (
    <div ref={ref} className={styles.popupContainer}>
      <p className={styles.title}>Are you sure?</p>
      <p className={styles.message}>{message}</p>
      <button onClick={onConfirm} className={styles.button}><span>Yes</span></button>
      <button onClick={onClose} className={styles.button}><span>No</span></button>
    </div>
  );
});

// If we don't add this line, we will get a react/display-name error
ConfirmationPopup.displayName = 'ConfirmationPopup';

export default ConfirmationPopup;
