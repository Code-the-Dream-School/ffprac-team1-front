import React from 'react';
import './Layout.css';


const LandingPage = () => (
  <div className="container">
    <div className="box" id="box1">
      <h3><strong>DevConnection:</strong> Personal Journey into the World of Professional Development</h3>
      <h5>Welcome to DevConnection—a platform created specifically for aspiring developers, web designers, and testers, among others. Here, at the intersection of technology and creativity, you embark on your exciting journey into professional development.</h5>
    </div>
    <div className="box" id="box2">
      <div className="container2">
        <h1>Sign In</h1>
        <div className="login">
          Login: <br />
          <input type="text" className="landingPage-input" placeholder="Email or username"></input> <br />
          Password: <br />
          <input type="text" className="landingPage-input" placeholder="Password"></input> <br />
          <button>Sign In</button>
          <h6>Don't have an account? <a href="/register">Sign Up</a></h6>
        </div>
      </div>
    </div>    
  </div>
);

export default LandingPage;