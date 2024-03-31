import React, { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../AuthContext';

const Nav = ({ setIsLoggedIn }) => {
  const { isLoggedIn } = useAuth();
  const dropdownRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const jwtToken = sessionStorage.getItem("jwtToken");
    if (jwtToken) {
      setIsLoggedIn(true);
    }

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [setIsLoggedIn]);

  useEffect(() => {
    if (location.pathname === '/') {
      sessionStorage.removeItem("jwtToken");
      setIsLoggedIn(false);
    }
  }, [location, setIsLoggedIn]);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      const dropdown = document.getElementById('dropdown');
      dropdown.classList.add('hidden');
    }
  };

  const handleSignOut = () => {
    setIsLoggedIn(false);
    sessionStorage.removeItem("jwtToken");
  };

  const toggleDropdown = () => {
    const dropdown = document.getElementById('dropdown');
    dropdown.classList.toggle('hidden');
  };

  const handleDropdownLinkClick = () => {
    toggleDropdown();
  };

  return (
    <div className="bg-black p-4 flex flex-row justify-between">
      <div className="flex flex-row items-center pl-2">
        <img src="./images/logo.svg" alt="logo" />
        <p to="/" className="text-2xl pl-2 font-bold">
          DevConnexion
        </p>
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
            <div className="pr-4 relative" ref={dropdownRef}>
              <span onClick={toggleDropdown} className="cursor-pointer">Search for...</span>
              <div id="dropdown" className="absolute bg-black rounded shadow-lg mt-2 hidden">
                <Link to="/projects-list" className="block px-4 py-2 text-gray-800 hover:bg-gray-200" onClick={handleDropdownLinkClick}>Projects</Link>
                <Link to="/profiles-list" className="block px-4 py-2 text-gray-800 hover:bg-gray-200" onClick={handleDropdownLinkClick}>Team members</Link>
              </div>
            </div>
            <div className="pr-4">
              <Link to="/messaging">Messaging</Link>
            </div>
            <div className="pr-4">
              <Link to="/notification">Notification</Link>
            </div>
            <div className="pr-4">
              <Link to="/profile">Profile</Link>
            </div>
            <div className="pr-4">
              <Link to="/" onClick={handleSignOut}>Sign Out</Link>
            </div>
          </>
        )}
      </nav>
    </div>
  );
};

export default Nav;
