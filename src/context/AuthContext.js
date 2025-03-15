import React, { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);

  const login = (user) => {
   // console.log('Logging in user:', user);
    setAuth({ userId: user.userId, name: user.name, role: user.role });
  };

  const logout = () => {
    setAuth(null);
    localStorage.removeItem("token");
  };

  
  console.log('Current auth state:', auth); 

  return <AuthContext.Provider value={{ auth, setAuth, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
