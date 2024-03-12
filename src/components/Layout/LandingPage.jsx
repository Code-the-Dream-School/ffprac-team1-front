import React from 'react';
import Search from '../Search/SearchBar.jsx';
import './Layout.css';


const LandingPage = () => (
  <div className="container">
    <div className="box" id="box1">
      <h3><strong>Personal Journey into the World of Professional Development</strong></h3>
      <h5>dev.connexion — a platform created specifically for aspiring developers, web designers, and testers, among others. Here, at the intersection of technology and creativity, you embark on your exciting journey into professional development.</h5>
      <div>
        <Search />  
      </div>
    </div>
    <div className="box" id="box2">
      <div className="container2">
        <h1>Welcome!</h1>
        <div className="login">
          Email<br />
          <input type="text" className="landingPage-input"></input> <br />
          Password<br />
          <input type="text" className="landingPage-input"></input> <br />
          <button className="signInOnLandingPage">Sign In</button>
          <h6>Don't have an account? <a href="/register">Sign Up</a></h6>
        </div>
      </div>
    </div>    
  </div>
);

export default LandingPage;