import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const isAuth = sessionStorage.getItem('isAuth');
  useEffect(()=> {
    if (isAuth) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [isAuth]);

  /*const loginUser = (token) => {
    sessionStorage.setItem('jwtToken', token);
    setIsLoggedIn(true);
  };*/

  const loginUser = (status) => {
    sessionStorage.setItem("isAuth", status);
    setIsLoggedIn(true);
  }

  const logoutUser = () => {
    sessionStorage.removeItem('isAuth');
    setIsLoggedIn(false);
  };
  
  return (
    <AuthContext.Provider value={{ isLoggedIn, logoutUser, loginUser }}>
      {children}
    </AuthContext.Provider>
  );
};