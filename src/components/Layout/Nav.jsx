import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import { logout } from '../../util/fetchData'; 

const Nav = () => {
  const { isLoggedIn, logoutUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
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
    <div className="bg-black p-4 flex flex-row justify-between">
      <div className="flex flex-row items-center pl-2">
        <img src="./images/logo.svg" alt="logo" />
        <Link to="/" className="text-2xl pl-2 font-bold">
          DevConnexion
        </Link>
      </div>
      <nav className="flex flex-row pr-4 pt-2">
      {!isLoggedIn ? (
          <>
            <div className="pr-4">
              <Link to="/register">Join Now</Link>
            </div>
            <div className="pr-4">
              <Link to="/login">Sign In</Link>
            </div>
          </>
        ) : (
          <>
            <div className="pr-4">
              <Link to="/projects-list">Browse projects</Link>
            </div>
            {/* <div className="pr-4">
              <Link to="/messaging">Messaging</Link>
            </div>
            <div className="pr-4">
              <Link to="/notification">Notification</Link>
            </div> */}
            <div className="pr-4">
              <Link to="/profile">Profile</Link>
            </div>
            <div className="pr-4">
              <Link to="/" onClick={handleLogout}>Sign Out</Link>
            </div>
          </>
        )}
      </nav>
    </div>
  );
};

export default Nav;
