// ConfirmationBox.tsx
import React from 'react';
import styles from './edit_account.module.css';

interface ConfirmationBoxProps {
  onCancel: () => void;
  onConfirm: () => void;
}

const ConfirmationBox: React.FC<ConfirmationBoxProps> = ({ onCancel, onConfirm }) => {
  return (
    <div className={styles.confirmationBox}>
      <p>Are you sure you want to delete this Tag?</p>
      <div className={styles.buttonContainer}>
        <button onClick={onCancel}>Cancel</button>
        <button onClick={onConfirm}>Confirm</button>
      </div>
    </div>
  );
};

export default ConfirmationBox;
