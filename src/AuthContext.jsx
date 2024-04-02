import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const jwtToken = sessionStorage.getItem('jwtToken');
  useEffect(()=> {
    if (jwtToken) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [jwtToken]);

  const loginUser = (token) => {
    sessionStorage.setItem('jwtToken', token);
    setIsLoggedIn(true);
  };

  const logoutUser = () => {
    sessionStorage.removeItem('jwtToken');
    setIsLoggedIn(false);
  };
  
  return (
    <AuthContext.Provider value={{ isLoggedIn, logoutUser, loginUser }}>
      {children}
    </AuthContext.Provider>
  );
};