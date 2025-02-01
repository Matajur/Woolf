import { HiUser } from "react-icons/hi";
import { FaPhoneAlt } from "react-icons/fa";

import styles from "./Contact.module.css";

export const Contact = ({ id, name, number, deleteContact }) => (
  <div className={styles.contactWrapper}>
    <div>
      <p className={styles.contactName}>
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
