import { useSelector, useDispatch } from "react-redux";

import { selectContacts, deleteContact } from "reduxx/contactsSlice";
import { selectNameFilter } from "reduxx/filtersSlice";
import Contact from "components/Contact/Contact";

import styles from "./ContactList.module.css";

export const ContactList = () => {
  const dispatch = useDispatch();

  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectNameFilter);

  const filteredContacts = contacts
    .filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    )
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <ul className={styles.contactList}>
      {filteredContacts.map((contact) => (
        <li className={styles.contactCard} key={contact.id}>
          <Contact
            id={contact.id}
            name={contact.name}
            number={contact.number}
            deleteContact={() => dispatch(deleteContact(contact.id))}
          />
        </li>
      ))}
    </ul>
  );
};
