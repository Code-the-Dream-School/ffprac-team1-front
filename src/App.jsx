import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
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
import { AuthProvider, useAuth } from './AuthContext';
import './App.css';

function ProtectedRoute({ element }) {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? element : <Navigate to="/login" />;
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return sessionStorage.getItem('isLoggedIn') === 'true';
  })

  useEffect(() => {
    sessionStorage.setItem('isLoggedIn', isLoggedIn);
  }, [isLoggedIn]);

  return (
    <AuthProvider isLoggedIn={isLoggedIn}>
      <BrowserRouter>
        <Nav setIsLoggedIn={setIsLoggedIn}/>      
        <Routes>
          <Route path="/" element={<LandingPage setIsLoggedIn={setIsLoggedIn}/>} />
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/search" element={<Search />} />
          <Route path="/search-results" element={<SearchResults />} />
          <Route path="/project" element={<Project />} />
          <Route path="/projects/:projectId" element={<Projects />} />
          <Route path="/profile" element={<ProtectedRoute element={<Profile />} />} />
          <Route path="/create-profile" element={<ProtectedRoute element={<CreateProfile />} />} />
          <Route path="/edit-profile" element={<ProtectedRoute element={<EditProfile />} />} />
          <Route path="/projects-list" element={<ProtectedRoute element={<ProjectsList />} />} />
          <Route path="/user-projects" element={<ProtectedRoute element={<UserProjects />} />} />
          <Route path="/create-project" element={<ProtectedRoute element={<CreateProject />} />} />
          <Route path="/messaging" element={<ProtectedRoute element={<Messaging />} />} />
          <Route path="/notification" element={<ProtectedRoute element={<Notification />} />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
