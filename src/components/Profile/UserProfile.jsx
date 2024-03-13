import React from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1>This is your profile. Here you can <a href='/edit-profile'>edit</a> you profile.</h1>
      <button onClick={() => navigate('/user-projects')}>Your projects</button>
    </div>
  );
};

export default Profile;