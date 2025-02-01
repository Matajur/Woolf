import { createSelector } from "@reduxjs/toolkit";

export const selectFilteredContacts = createSelector(
  [(state) => state.contacts.items, (state) => state.filters.name],
  (contacts, filter) =>
    contacts
      .filter((contact) =>
        contact.name.toLowerCase().includes(filter.toLowerCase())
      )
      .sort((a, b) => a.name.localeCompare(b.name))
);

export const selectNameFilter = (state) => state.filters.name;
