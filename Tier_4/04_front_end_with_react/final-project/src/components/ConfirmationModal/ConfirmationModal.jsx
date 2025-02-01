import Modal from "react-modal";
import styles from "./ConfirmationModal.module.css";

Modal.setAppElement("#root");

export const ConfirmationModal = ({
  isOpen,
  onRequestClose,
  onConfirm,
  message,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={{
        content: {
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "300px",
          height: "150px",
          background: "gray",
          padding: "20px",
          borderRadius: "8px",
        },
      }}
    >
      <p>{message}</p>
      <div className={styles.actions}>
        <button onClick={onConfirm}>Confirm</button>
        <button onClick={onRequestClose}>Cancel</button>
      </div>
    </Modal>
  );
};
