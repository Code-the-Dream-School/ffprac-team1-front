import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './components/Layout/LandingPage.jsx';
import Nav from './components/Layout/Nav.jsx';
import Login from './components/Authentification/Login.jsx';
import Register from './components/Authentification/Registration.jsx';
import UserProfilePage from './components/Profile/UserProfilePage.jsx';
import CreateProfile from './components/Profile/CreateProfile.jsx';
import EditProfile from './components/Profile/EditProfile.jsx';
import ProjectsList from './components/Project/ProjectsList.jsx';
import Project from './components/Project/Project.jsx';
import CreateProject from './components/Project/CreateProject.jsx';
import UserProjects from './components/Project/UserProjects.jsx';
import Notification from './components/Notification/Notification.jsx';
import Messaging from './components/Notification/Messaging.jsx';
import Search from './components/Search/SearchBar.jsx';
import SearchResults from './components/Search/SearchResults.jsx';
import ProtectedRoute from './ProtectedRoute';
import { AuthProvider } from './AuthContext';
import { ProfileProvider } from "./components/Profile/ProfileContext";
import './App.css';

function App() {
  return (
    <AuthProvider>
      <ProfileProvider>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/search" element={<Search />} />
          <Route path="/search-results" element={<SearchResults />} />
          <Route path="/projects/:projectId" element={<Project />} />
          <Route path="/profile" element={<ProtectedRoute element={<UserProfilePage />} />} /> 
          <Route path="/create-profile" element={<ProtectedRoute element={<CreateProfile />} />} />
          <Route path="/edit-profile" element={<ProtectedRoute element={<EditProfile />} />} />
          <Route path="/projects-list" element={<ProtectedRoute element={<ProjectsList />} />} />
          <Route path="/user-projects" element={<ProtectedRoute element={<UserProjects />} />} />
          <Route path="/create-project" element={<ProtectedRoute element={<CreateProject />} />} />
          <Route path="/messaging" element={<ProtectedRoute element={<Messaging />} />} />
          <Route path="/notification" element={<ProtectedRoute element={<Notification />} />} />
        </Routes>
      </BrowserRouter>
      </ProfileProvider>
    </AuthProvider>
  );
}

export default App;
