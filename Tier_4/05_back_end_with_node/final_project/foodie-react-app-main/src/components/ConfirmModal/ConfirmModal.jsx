import React from 'react';
import css from './ConfirmModal.module.css';
import Btn from '../UI/Btn/Btn';
import { X } from 'lucide-react';

const ConfirmModal = ({ onConfirm, onCancel, message, onClose }) => {
  const handleOverlayClick = e => {
    if (e.target.classList.contains(css.overlay)) {
      onCancel();
    }
  };

  return (
    <div className={css.overlay} onClick={handleOverlayClick}>
      <div className={css.modal}>
        <button type="button" className={css.closeButton} onClick={onCancel}>
          <X size={20} />
        </button>
        <p className={css.confirmTitle}>{message}</p>
        <p className={css.modalText}>You can log back in at any time.</p>

        <div className={css.inputFieldsContainer}>
          <Btn variant="confirm" className={css.buttonLogOut} onClick={onConfirm}>
            Log out
          </Btn>
        </div>
        <div className={css.buttons}>
          <Btn variant="cancel" className={css.buttonCancel} onClick={onCancel}>
            Cancel
          </Btn>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
