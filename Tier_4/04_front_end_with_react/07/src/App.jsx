import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ContactForm, SearchBox, ContactList, Notification } from "components";
import { fetchContacts } from "reduxx";
import { selectContactsLoading, selectContactsError } from "reduxx";

function App() {
  const dispatch = useDispatch();
  const loading = useSelector(selectContactsLoading);
  const error = useSelector(selectContactsError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm />
      <SearchBox />
      {loading && <p>Loading contacts...</p>}
      {error && <Notification message={error} />}
      <ContactList />
    </div>
  );
}

export default App;
