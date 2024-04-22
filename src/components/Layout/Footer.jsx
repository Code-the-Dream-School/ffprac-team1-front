import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import { logout } from '../../util/fetchData'; 

const Footer = () => {
  const { isLoggedIn, logoutUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    logoutUser();
    logout()
     .then (() => {
      logoutUser()      
      navigate('/')
    }) 
      .catch (error => {
        console.log(error);
    })
  };

  return (
    <div className="bg-black p-4">
      <p className="text-center text-blue/40"> Copyright &copy; 2024; Designed by DevConnexion  </p>
    </div>
  );
};

export default Footer;
