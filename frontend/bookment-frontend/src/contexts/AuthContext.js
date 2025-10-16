import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [userEmail, setUserEmail] = useState(() => localStorage.getItem("userEmail"));

  useEffect(() => {
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      localStorage.setItem("token", token);
    } else {
      delete api.defaults.headers.common["Authorization"];
      localStorage.removeItem("token");
    }
  }, [token]);

  const login = async (email, password) => {
    const res = await api.post("/auth/login", { email, password });
    setToken(res.data.token);
    setUserEmail(email);
    localStorage.setItem("userEmail", email);
  };

  const register = async (fullName, email, password) => {
    await api.post("/auth/register", { fullName, email, password });
  };

  const logout = () => {
    setToken(null);
    setUserEmail(null);
    localStorage.removeItem("userEmail");
  };

  return (
    <AuthContext.Provider value={{ token, userEmail, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
