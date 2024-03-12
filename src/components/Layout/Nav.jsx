import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';

const Nav = ({ isLoggedIn }) => {
  return (
    <div className="header">
      <nav className="leftMenu">
        <ul>
          <li className="projectLogo">
            <Link to="/">
              <img src="./images/logo.svg" alt="logo" className="responsive-logo"/>
            </Link>
          </li>
          <li className="projectName">
            <Link to="/">dev.connect</Link>
          </li>
        </ul>
      </nav>
      <nav className="rightMenu">
      <ul>
        {!isLoggedIn && 
        <li><Link to="/register">Join Now</Link></li>}
        {!isLoggedIn ? (
          <li><Link to="/login">Sign In</Link></li>
        ) : (
          <>
            <li><Link to="/messaging">Messaging</Link></li>
            <li><Link to="/notification">Notification</Link></li>
            <li><Link to="/profile">Profile</Link></li>
            <li><Link to="/">Sign Out</Link></li>
          </>
        )}
      </ul>
      </nav>
    </div>
  );
};

export default Nav;
