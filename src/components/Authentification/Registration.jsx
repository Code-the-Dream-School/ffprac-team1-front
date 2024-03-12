import React from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  
  return (
    <div>
      <h1>This is registration page.</h1>
      <button onClick={() => navigate('/create-profile')}>Register</button>
    </div>
  );
};
  
export default Register;