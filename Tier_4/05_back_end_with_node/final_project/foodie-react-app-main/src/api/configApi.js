import axios from "axios";

export const api = axios.create({
  // baseURL: 'http://localhost:3000/api',
  baseURL: "https://foodie-node-api-04wv.onrender.com/api",
});

export const setToken = (token) => {
  if (!token) {
    delete api.defaults.headers.common.Authorization;
    return;
  }
  api.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const clearToken = () => {
  api.defaults.headers.common.Authorization = "";
};
