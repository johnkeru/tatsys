import axios from "axios";
import env from "../utils/env";

// Function to get token from localStorage
const getToken = () => {
  return localStorage.getItem("token") || null;
};

const api = axios.create({
  baseURL: env("SERVER_URL"),
});

// Attach JWT token to requests
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
