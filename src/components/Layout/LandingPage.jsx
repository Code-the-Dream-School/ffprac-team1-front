import React from 'react';
import Search from '../Search/SearchBar.jsx';
import Login from '../Authentification/Login.jsx';

const LandingPage = () => (
  <div className="flex flex-row items-center h-screen bg-black pb-20">
    <div className="basis-1/2">
      <div className="w-3/4 mx-auto">
        <h3 className="text-2xl mb-4 text-blue">
          <span className="font-bold text-blue">DevConnexion:</span> Personal Journey into the World
          of Professional Development
        </h3>
        <p className="font-sans font-light mb-8">
          Welcome to DevConnexion — a platform created specifically for aspiring developers, web
          designers, and testers, among others. Here, at the intersection of technology and
          creativity, you embark on your exciting journey into professional development.
        </p>
        <Search />
      </div>
    </div>
    <div className="basis-1/2">
      <div className="w-3/5 mx-auto px-8">
        <h1 className="text-center text-xl pb-6">Sign In</h1>
        <Login />
      </div>
    </div>
  </div>
);

export default LandingPage;
