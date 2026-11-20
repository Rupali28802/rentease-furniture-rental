import axios from "axios";

export const api = axios.create({
  baseURL: "https://rentease-furniture-rental-ur25.vercel.app/api",
});

console.log("AXIOS BASE URL:", api.defaults.baseURL);

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
