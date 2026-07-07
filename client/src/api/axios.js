import axios from "axios";

 export const api = axios.create({
  baseURL: "http://localhost:5000/api",
});
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; 
  }
  return config;
});


// api.interceptors.response.use(
//   (res) => res,
//   (err) => {
//     if (err.response?.status === 401) {
//       // Token invalid/expired → clear storage + redirect
//       localStorage.removeItem("token");
//       localStorage.removeItem("user");
//       window.location.href = "/login";
//     }
//     return Promise.reject(err);
//   },
// );