import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

// attach token automatically from sessionStorage
api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
