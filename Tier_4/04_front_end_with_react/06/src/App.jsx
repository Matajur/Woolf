import { useSelector } from "react-redux";
import { ContactForm, SearchBox, ContactList, Notification } from "components";
import { selectContacts } from "reduxx/contactsSlice";

function App() {
  const phonebook = useSelector(selectContacts);

  return (
    <>
      <div>
        <h1>Phonebook</h1>
        <ContactForm />
        <SearchBox />
        {phonebook.length != 0 ? <ContactList /> : <Notification />}
      </div>
    </>
  );
}

export default App;
