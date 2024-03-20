import React from 'react';
import { useNavigate } from 'react-router-dom';

import Project from '../Project/ProjectCard.jsx';

const Profile = () => {
  const navigate = useNavigate();
  return (
    <div className="contanier-primary flex flex-col">
      <h1>
        This is your profile. Here you can <a href="/edit-profile">edit</a> you profile.
      </h1>
      <button onClick={() => navigate('/user-projects')}>Your projects</button>
      <div className="flex flex-row flex-wrap items-start">
        <Project />
        <Project />
        <Project />
      </div>
    </div>
  );
};

export default Profile;
