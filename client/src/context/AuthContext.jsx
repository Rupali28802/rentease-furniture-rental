import { createContext, useContext, useState,useEffect } from "react";
import { api } from "../api/axios.js";
// import {useAuth} from "../context/AuthContext"
// import {getInitials} from "../utils/getInitials.js"


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);

 useEffect(() => {
   const storedUser = localStorage.getItem("user");
   if (storedUser && storedUser !== "undefined") {
     try {
       setUser(JSON.parse(storedUser));
     } catch (err) {
       console.error("Invalid user JSON:", err);
       localStorage.removeItem("user"); // clear corrupt data
     }
   }
 }, []);

  // REGISTER
  const register = async (formData) => {
    try {
      const res = await api.post("/auth/register", formData);

      setUser(res.data.user);
      setToken(res.data.token);
localStorage.setItem("user",JSON.stringify(res.data.user))
      localStorage.setItem("token", res.data.token);

      return res.data;
    } catch (error) {
      throw (
        error.response?.data || {
          message: "Registration failed. Please try again.",
        }
      );
    }
  };

  // LOGIN
  const login = async (formData) => {
    try {
      const res = await api.post("/auth/login", formData);

      setUser(res.data.user);
      setToken(res.data.token);
localStorage.setItem("user",JSON.stringify(res.data.user));
      localStorage.setItem("token", res.data.token);

      return res.data;
    } catch (error) {
      throw (
        error.response?.data || {
          message: "Login failed. Please try again.",
        }
      );
    }
  };

  // FORGOT PASSWORD
  const forgotPassword = async (email) => {
    try {
      const res = await api.post("/auth/forgot-password", { email });

      return res.data;
    } catch (error) {
      throw (
        error.response?.data || {
          message: "Failed to send reset email.",
        }
      );
    }
  };

  // RESET PASSWORD
  const resetPassword = async (token, password) => {
    try {
      const res = await api.put(`/auth/reset/${token}`, {
        password,
      });

      return res.data;
    } catch (error) {
      throw (
        error.response?.data || {
          message: "Password reset failed.",
        }
      );
    }
  };

  // LOGOUT
  const logout = async () => {
    try {
      await api.post(
        "/auth/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
  localStorage.removeItem("token");
  localStorage.removeItem("user");
      setUser(null);
      setToken(null);

    
    } catch (error) {
      throw (
        error.response?.data || {
          message: "Logout failed.",
        }
      );
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        register,
        login,
        logout,
        forgotPassword,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

