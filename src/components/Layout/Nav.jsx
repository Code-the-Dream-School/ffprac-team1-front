import React from 'react';
import { Link } from 'react-router-dom';

const Nav = ({ isLoggedIn }) => {
  return (
    <nav>
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/projects">Browse Projects</Link></li>
      {!isLoggedIn && 
        <li>
          <Link to="/register">Join Now</Link>
        </li>}
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
  );
};

export default Nav;
