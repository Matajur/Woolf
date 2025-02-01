# Tier 4. Module 1: Mastering Front-End Development with React

## Topic 11 - Condition management. Redux basics

## Topic 12 - Redux Toolkit

## Homework

### Technical task - Phonebook

Refactor the code of your Contact Book application from the third module homework. Add state management using the [Redux Toolkit](https://redux-toolkit.js.org/) library, instead of local React state.

#### Folders and files

Create a folder `src/redux` to store files related to Redux logic:

* `store.js` - store creation file
* `contactsSlice.js` - a slice file for contacts
* `filtersSlice.js` - slice file for filters

#### Initial state

Let the initial state of Redux look like this.

```
{
  contacts: {
		items: []
	},
  filters: {
		name: ""
	}
}
```

Here we will highlight two slices - contacts (`contacts` field) and filters (`filters` field).

#### Slice of contacts

In the `contactsSlice.js` file, declare a contact slice using the `createSlice()` function.

Slice actions for use in `dispatch`:

* `addContact` - adding a new contact to the `items` property;
* `deleteContact` - delete a contact by id from the `items` property.

Declare selector functions for use in `useSelector`:

* `selectContacts` - returns a list of contacts from the items property.

From the slice file, export the reducer, as well as its actions and selectors.

#### Filter slice

In the `filtersSlice.js` file, declare a filter slice using the `createSlice()` function.

Slice actions for use in `dispatch`:

* `changeFilter` - changing the filter value in the `name` property.

Declare selector functions for use in `useSelector`:

* `selectNameFilter` - returns the filter value from the `name` property.

From the slice file, export the reducer, as well as its actions and selectors.

#### React Redux library

Connect React components with Redux logic using the `useSelector` and `useDispatch` hooks of the [React Redux](https://react-redux.js.org/) library.

All components except the `Contact` card in the `ContactList` must not accept any props. Instead, components must use the `useSelector` hook and slice selector functions to get the values ​​they need.

To send actions, the components use the `useDispatch` hook and previously declared slice actions:

* The `ContactsForm` sends an action to add a contact upon submission;
* The `Contact` card sends a contact deletion action when the delete button is clicked;
* The `SearchBox` filter field sends an action to change the filter when entered in the text field.

#### Redux Persist library

Use the [Redux Persist](https://www.npmjs.com/package/redux-persist) library to store an array of contacts in local storage.

In the `store.js` file:

* Create a configuration to save the `items` field from the contacts slice.
* Use `persistReducer` to apply the configuration to the pin slice reducer.
* Use `persistStore` to create a `persistor` for `PersistGate`.

### Acceptance criteria

* Main link: the assignment work page on [Vercel](https://vercel.com/).
* The project was created using [Vite](https://vitejs.dev/).
* There should be no errors or warnings in the console when running the task code.
* For each component, there is a separate folder in the `src/components` folder that contains the JSX file of the React component itself and its styles file. The name of the folder, the component file (with the extension `.jsx`) and the style file (before `.module.css`) are the same and correspond to the names specified in the tasks (if there were any)
* The JS code is clean and clear, using Prettier.
* Used `Redux Toolkit` library.
* Styling is done by CSS modules.
