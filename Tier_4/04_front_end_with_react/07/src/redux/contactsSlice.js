import { createSlice, createSelector } from '@reduxjs/toolkit';
import { fetchContacts, addContact, deleteContact } from './contactsOps';

const initialState = {
    items: [],
    loading: false,
    error: null,
};

const contactsSlice = createSlice({
    name: 'contacts',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchContacts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchContacts.fulfilled, (state, action) => {
                state.items = action.payload;
                state.loading = false;
            })
            .addCase(fetchContacts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(addContact.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addContact.fulfilled, (state, action) => {
                state.items.push(action.payload);
                state.loading = false;
            })
            .addCase(addContact.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(deleteContact.fulfilled, (state, action) => {
                state.items = state.items.filter((contact) => contact.id !== action.payload);
            });
    },
});

export const selectContacts = (state) => state.contacts.items;
export const selectContactsLoading = (state) => state.contacts.loading;
export const selectContactsError = (state) => state.contacts.error;
export const selectFilteredContacts = createSelector(
    [(state) => state.contacts.items, (state) => state.filters.name],
    (contacts, filter) =>
        contacts.filter((contact) =>
            contact.name.toLowerCase().includes(filter.toLowerCase())
        ).sort((a, b) => a.name.localeCompare(b.name))
);

export const contactsReducer = contactsSlice.reducer;
