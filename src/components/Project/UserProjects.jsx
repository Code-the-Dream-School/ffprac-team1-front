import React from "react";
import { useNavigate } from "react-router-dom";

const UserProjects = () => {
  const navigate = useNavigate();
  return (
  <div>
    <h1>List if your projects.</h1>
    <button onClick={() => navigate('/create-project')}>Create project</button>
  </div>
  );
};
export default UserProjects;  