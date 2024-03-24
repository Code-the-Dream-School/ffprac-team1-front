import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './components/Layout/LandingPage.jsx';
import Nav from './components/Layout/Nav.jsx';
import Login from './components/Authentification/Login.jsx';
import Register from './components/Authentification/Registration.jsx';
import Profile from './components/Profile/UserProfile.jsx';
import CreateProfile from './components/Profile/CreateProfile.jsx';
import EditProfile from './components/Profile/EditProfile.jsx';
import ProjectsList from './components/Project/ProjectsList.jsx';
import Project from './components/Project/Project.jsx';
import Projects from './components/Project/Project_unauthUsers.jsx';
import CreateProject from './components/Project/CreateProject.jsx';
import UserProjects from './components/Project/UserProjects.jsx';
import Notification from './components/Notification/Notification.jsx';
import Messaging from './components/Notification/Messaging.jsx';
import Search from './components/Search/SearchBar.jsx';
import SearchResults from './components/Search/SearchResults.jsx';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <BrowserRouter>
      <Nav isLoggedIn={isLoggedIn} />
      <Routes>
        <Route path="/" element={<LandingPage setIsLoggedIn={setIsLoggedIn}/>} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/create-profile" element={<CreateProfile />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/projects" element={<ProjectsList />} />
        <Route path="/user-projects" element={<UserProjects />} />
        <Route path="/create-project" element={<CreateProject />} />
        <Route path="/messaging" element={<Messaging />} />
        <Route path="/notification" element={<Notification />} />
        <Route path="/search" element={<Search />} />
        <Route path="/search-results" element={<SearchResults />} />
        <Route path="/project" element={<Project />} />
        <Route path="/projects/:projectId" element={<Projects />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
