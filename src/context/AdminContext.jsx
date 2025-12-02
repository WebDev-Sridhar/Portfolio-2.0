import { createContext, useContext, useState, useEffect } from "react";
import React from "react";

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(() => {
    return localStorage.getItem("isAdmin") === "true";
  });

  useEffect(() => {
    localStorage.setItem("isAdmin", isAdmin ? "true" : "false");
  }, [isAdmin]);

  const loginAdmin = () => setIsAdmin(true);
  const logoutAdmin = () => setIsAdmin(false);

  return (
    <AdminContext.Provider value={{ isAdmin, loginAdmin, logoutAdmin }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);
