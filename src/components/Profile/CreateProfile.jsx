import React from "react";
import { useNavigate } from "react-router-dom";


const CreateProfile = () => {
  const navigate = useNavigate();
  
  return (
    <div>
      <h1>Create your profile.</h1>
      <button onClick={() => navigate('/profile')}>Submit</button>
    </div>
  );
};

export default CreateProfile;