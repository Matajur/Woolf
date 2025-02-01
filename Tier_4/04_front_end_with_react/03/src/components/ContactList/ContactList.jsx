import Contact from "components/Contact/Contact"
import styles from "./ContactList.module.css";

export const ContactList = ({contacts, deleteContact}) => (
    <ul className={styles.contactList}>
      {contacts.map((contact) => (
        <li className={styles.contactCard} key={contact.id}>
          <Contact
            id={contact.id}
            name={contact.name}
            number={contact.number}
            deleteContact={deleteContact}
          />
        </li>
      ))}
    </ul>
  );
