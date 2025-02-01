import { useDispatch, useSelector } from "react-redux";

import { Contact } from "components";
import { selectFilteredContacts } from "reduxx";
import { deleteContact } from "reduxx";

import styles from "./ContactList.module.css";

export const ContactList = () => {
  const dispatch = useDispatch();

  const contacts = useSelector(selectFilteredContacts);

  const deleteExistingContact = (contactId) => {
    dispatch(deleteContact(contactId));
  };

  return (
    <ul className={styles.contactList}>
      {contacts.map((contact) => (
        <li className={styles.contactCard} key={contact.id}>
          <Contact
            id={contact.id}
            name={contact.name}
            number={contact.number}
            deleteContact={deleteExistingContact}
          />
        </li>
      ))}
    </ul>
  );
};
