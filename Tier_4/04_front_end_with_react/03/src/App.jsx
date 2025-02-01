import { useState, useEffect } from "react";
import { ContactForm, SearchBox, ContactList, Notification } from "components";
import dummyPhonebook from "data/phonebook.json";

const getUserContacts = () => {
  const localContacts = localStorage.getItem("curContacts");
  if (localContacts !== null) {
    return JSON.parse(localContacts);
  }
  return dummyPhonebook;
};

const userContacts = getUserContacts();

function App() {
  const [filterValue, setFilterValue] = useState("");
  const [phonebook, setPhonebook] = useState(userContacts);

  useEffect(() => {
    localStorage.setItem("curContacts", JSON.stringify(phonebook));
  }, [phonebook]);

  const handleFilterChange = (value) => {
    setFilterValue(value);
  };

  const getFilteredContacts = () => {
    return phonebook
      .filter((contact) =>
        contact.name.toLowerCase().includes(filterValue.toLowerCase())
      )
      .sort((a, b) => a.name.localeCompare(b.name));
  };

  const filteredContacts = getFilteredContacts();

  const addContact = (newContact) => {
    setPhonebook((prevPhonebook) => [...prevPhonebook, newContact]);
  };

  const deleteContact = (contactId) => {
    setPhonebook((prevContacts) =>
      prevContacts.filter((contact) => contact.id !== contactId)
    );
  };

  return (
    <>
      <div>
        <h1>Phonebook</h1>
        <ContactForm addContact={addContact} />
        <SearchBox setFilter={handleFilterChange} />
        {filteredContacts ? (
          <ContactList
            contacts={filteredContacts}
            deleteContact={deleteContact}
          />
        ) : (
          <Notification></Notification>
        )}
      </div>
    </>
  );
}

export default App;
