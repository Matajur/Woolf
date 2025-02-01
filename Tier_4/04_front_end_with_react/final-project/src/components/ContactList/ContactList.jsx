import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import { Contact } from "components";
import { selectFilteredContacts } from "reduxstore";
import { deleteContact, updateContact } from "reduxstore";

import styles from "./ContactList.module.css";

export const ContactList = () => {
  const dispatch = useDispatch();

  const contacts = useSelector(selectFilteredContacts);

  const deleteExistingContact = async (contactId) => {
    const result = await dispatch(deleteContact(contactId));
    if (deleteContact.fulfilled.match(result)) {
      toast.success("Contact deleted successfully!");
    } else {
      toast.error(result.payload || "Failed to delete contact");
    }
  };

  const editExistingContact = async (contactId, updatedContact) => {
    const result = await dispatch(updateContact({ contactId, updatedContact }));
    if (updateContact.fulfilled.match(result)) {
      toast.success("Contact updated successfully!");
    } else {
      toast.error(result.payload || "Failed to update contact");
    }
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
            editContact={editExistingContact}
          />
        </li>
      ))}
    </ul>
  );
};
