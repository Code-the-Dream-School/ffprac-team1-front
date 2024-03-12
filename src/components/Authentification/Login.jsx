import React from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  setIsLoggedIn(true);
  navigate('/profile');

  return (
    <div>
      <h1>This is the login page.</h1>
      <button onClick={() => navigate('/profile')}>Sign In</button>
      <h2>If you don't have an account, please, <a href="/register"></a>Sign Up</h2>
      <button onClick={() => navigate('/register')}>Sign Up</button>
    </div>
  );
};

export default Login;
