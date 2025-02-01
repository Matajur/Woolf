import Modal from "react-modal";
import styles from "./ImageModal.module.css";

Modal.setAppElement("#root");

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.75)",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    background: "transparent",
    border: "none",
    padding: "0",
  },
};

export const ImageModal = ({ isOpen, onClickClose, image }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClickClose}
      style={customStyles}
    >
      <div className={styles.imageWrapper}>
        <img
          className={styles.modalImage}
          src={image.src}
          alt={image.alt}
        />
        <button onClick={onClickClose} className={styles.modalButton} aria-label="Close Modal">
          &times;
        </button>
      </div>
    </Modal>
  );
};
