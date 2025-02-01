import { HiUser } from "react-icons/hi";
import { FaPhoneAlt } from "react-icons/fa";
import styles from "./Contact.module.css";

const Contact = ({ id, name, number, deleteContact }) => {
  return (
    <div className={styles.contactWrapper}>
      <div>
        <p className={styles.contacName}>
          <HiUser className={styles.userIcon} />
          {name}
        </p>
        <p>
          <FaPhoneAlt className={styles.phoneIcon} />
          {number}
        </p>
      </div>
      <button type="button" onClick={() => deleteContact(id)}>
        Delete
      </button>
    </div>
  );
};

export default Contact;
