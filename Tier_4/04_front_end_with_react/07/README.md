# Tier 4. Module 1: Mastering Front-End Development with React

## Topic 13 - Asynchronous Redux

## Topic 14 - Optimization of selectors

## Homework

### Technical task - Phonebook

Refactor the Contact Book application code from the previous module's homework.

* Release the code responsible for storing and reading contacts from local storage, that is, the code related to Redux Persist.
* Add backend interaction for storing contacts.

#### Backend

Create your personal backend for development using the [mockapi.io](https://mockapi.io/) UI service. Sign up using your GitHub account and choose the free plan. Create a backend application and a resource constructor to get the /contacts endpoint.

#### Initial state

Add loading indicator and HTTP request error handling to Redux state. To do this, change the state form of the contact slice by adding the `loading` and `error` properties.

```
{
  contacts: {
    items: [],
    loading: false,
    error: null
  },
  filters: {
		name: ""
	}
}
```

#### Operations

In the `redux` folder, create a `contactsOps.js` file to store asynchronous action generators.

* Use the `createAsyncThunk` function to declare operations.
* Use the `axios` library to perform HTTP requests.

**Announce the following operations:**

* `fetchContacts` - receiving an array of contacts (GET method) by request. The basic action type is the string `"contacts/fetchAll"`.
* `addContact` - adding a new contact (POST method). The basic type of action is the string `"contacts/addContact"`.
* `deleteContact` - delete a contact by ID (DELETE method). The basic action type is the string `"contacts/deleteContact"`.

To correctly process an HTTP request error in the middle of operations, use the `try...catch` construct, and in the `catch` block return the result of the `thunkAPI.rejectWithValue` method call.

Process all three actions (fulfilled, rejected, pending) and change data in the Redux state in the `extraReducers` property of the contact slice, and remove the `reducers` property from it.

#### Memoization of selectors

After adding the `loading` and `error` properties to the contact slice, there will be a problem with optimizing contact filtering, as the filtering expression will be executed not only when the contacts or filter change, but also when `loading` and `error` change.

**To solve this problem:**

* In the contacts slice file `contactsSlice.js`, create and export the `selectFilteredContacts` memoized selector using the `createSelector` function.
* The selector should depend on the current pin array and filter value, and return the filtered pin array.
* The `selectFilteredContacts` selector is imported into the `ContactList.jsx` contact list component and used in `useSelector`.

#### Collection of contacts

Since your contact collection is now stored on the backend, then:

* When downloading the application, make a request to the backend to receive an array of contacts in the `Arr` component.
* When creating a new contact, it is no longer necessary to add a unique identifier to it, the backend itself will do this and return the object of the new contact.

### Acceptance criteria

* Main link: the assignment work page on [Vercel](https://vercel.com/).
* The project was created using [Vite](https://vitejs.dev/).
* There should be no errors or warnings in the console when running the task code.
* For each component, there is a separate folder in the `src/components` folder that contains the JSX file of the React component itself and its styles file. The name of the folder, the component file (with the extension `.jsx`) and the style file (before `.module.css`) are the same and correspond to the names specified in the tasks (if there were any)
* The JS code is clean and clear, using Prettier.
* Used `Redux Toolkit` library.
* Styling is done by CSS modules.
