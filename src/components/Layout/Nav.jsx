import React from 'react';
import { Link } from 'react-router-dom';

const Nav = ({ isLoggedIn }) => {
  return (
    <div className="bg-black p-4 flex flex-row justify-between">
      <div className="flex flex-row items-center pl-2">
        <Link to="/">
          {' '}
          <img src="./images/logo.svg" alt="logo" />
        </Link>
        <Link to="/" className="text-2xl pl-2 font-bold">
          DevConnexion
        </Link>
      </div>
      <nav className="flex flex-row pr-4 pt-2">
        {/* <div className="pr-4"><Link to="/projects">Browse Projects</Link></div> */}
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
              {' '}
              <Link to="/messaging">Messaging</Link>{' '}
            </div>
            <div className="pr-4">
              {' '}
              <Link to="/notification">Notification</Link>{' '}
            </div>
            <div className="pr-4">
              {' '}
              <Link to="/Profile">Profile</Link>{' '}
            </div>
            <div className="pr-4">
              {' '}
              <Link to="/">Sign Out</Link>{' '}
            </div>
          </>
        )}
      </nav>
    </div>
  );
};

export default Nav;
