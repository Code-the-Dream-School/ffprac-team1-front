import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const isToken = sessionStorage.getItem('isToken');
  useEffect(() => {
    if (isToken) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [isToken]);

  const loginUser = status => {
    sessionStorage.setItem('isToken', status);
    setIsLoggedIn(true);
  };

  const logoutUser = () => {
    sessionStorage.removeItem('isToken');
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, logoutUser, loginUser }}>
      {children}
    </AuthContext.Provider>
  );
};
