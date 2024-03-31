import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children, isLoggedIn }) => {
  const [loggedIn, setLoggedIn] = useState(isLoggedIn);

  useEffect(() => {
    setLoggedIn(isLoggedIn);
  }, [isLoggedIn]);

  return (
    <AuthContext.Provider value={{ isLoggedIn: loggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};
