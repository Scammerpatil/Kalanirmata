"use client";
import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext({
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

import { ReactNode } from "react";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem("isAuthenticated") ? true : false;
  });

  const login = () => {
    console.log("login");
    sessionStorage.setItem("isAuthenticated", JSON.stringify(true));
    setIsAuthenticated(true);
  };

  const logout = () => {
    sessionStorage.removeItem("isAuthenticated");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
