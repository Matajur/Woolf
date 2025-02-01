import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    items: []
}

const contactsSlice = createSlice({
    name: 'contacts',
    initialState,
    reducers: {
        addContact: (state, action) => {
            state.items.push(action.payload)
        },
        deleteContact: (state, action) => {
            state.items = state.items.filter(contact => contact.id !== action.payload);
        },
    },
})

export const selectContacts = (state) => { return state.contacts.items };

export const { addContact, deleteContact } = contactsSlice.actions;

export const contactsReducer = contactsSlice.reducer;
