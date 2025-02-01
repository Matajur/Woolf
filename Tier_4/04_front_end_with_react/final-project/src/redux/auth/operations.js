import axios from "api/axiosInstance";

import { createAsyncThunk } from "@reduxjs/toolkit";

const setToken = (token) => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

const removeToken = () => {
  delete axios.defaults.headers.common["Authorization"];
};

export const register = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post("/users/signup", userData);
      setToken(response.data.token);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post("/users/login", userData);
      setToken(response.data.token);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await axios.post("/users/logout");
      return removeToken();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const refreshUser = createAsyncThunk(
  "auth/refresh",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const localToken = state.auth.token;
      setToken(localToken); // set token from local storage to axios headers

      const response = await axios.get("/users/current");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
  {
    // Condition under which to make a request to the server
    condition: (_, { getState }) => {
      const state = getState();
      const localToken = state.auth.token;
      return localToken !== null;
    },
  }
);
