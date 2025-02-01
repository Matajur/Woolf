import axios from "api/axiosInstance";

import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchContacts = createAsyncThunk(
  "contacts/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/contacts");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addContact = createAsyncThunk(
  "contacts/addContact",
  async (newContact, { rejectWithValue }) => {
    try {
      console.log("Dispatching addContact:", newContact);
      const response = await axios.post("/contacts", newContact);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  "contacts/deleteContact",
  async (contactId, { rejectWithValue }) => {
    try {
      await axios.delete(`/contacts/${contactId}`);
      return contactId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateContact = createAsyncThunk(
  "contacts/updateContact",
  async ({ contactId, updatedContact }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `/contacts/${contactId}`,
        updatedContact
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
