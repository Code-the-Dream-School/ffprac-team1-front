import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './components/Layout/LandingPage.jsx';
import Nav from './components/Layout/Nav.jsx';
import Footer from './components/Layout/Footer.jsx';
import AboutPage from './components/Layout/AboutPage.jsx';
import Login from './components/Authentification/Login.jsx';
import Register from './components/Authentification/Registration.jsx';
import Profile from './components/Profile/UserProfile.jsx';
import CreateProfile from './components/Profile/CreateProfile.jsx';
import EditProfile from './components/Profile/EditProfile.jsx';
import ProjectsList from './components/Project/ProjectsList.jsx';
import Project from './components/Project/Project.jsx';
import CreateProject from './components/Project/CreateProject.jsx';
import UserProjects from './components/Project/UserProjects.jsx';
import ApplyForRole from './components/UserActions/ApplyForRole.jsx';
import Messaging from './components/UserActions/Messaging.jsx';
import Search from './components/Search/SearchBar.jsx';
import SearchResults from './components/Search/SearchResults.jsx';
import ProtectedRoute from './ProtectedRoute';
import { AuthProvider } from './AuthContext';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<AboutPage/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/search" element={<Search />} />
          <Route path="/search-results" element={<SearchResults />} />
          <Route path="/projects/:projectId" element={<Project />} />
          <Route path="/profile" element={<ProtectedRoute element={<Profile />} />} />
          <Route path="/create-profile" element={<ProtectedRoute element={<CreateProfile />} />} />
          <Route path="/edit-profile" element={<ProtectedRoute element={<EditProfile />} />} />
          <Route path="/projects-list" element={<ProtectedRoute element={<ProjectsList />} />} />
          <Route path="/user-projects" element={<ProtectedRoute element={<UserProjects />} />} />
          <Route path="/create-project" element={<ProtectedRoute element={<CreateProject />} />} />
          <Route path="/messaging" element={<ProtectedRoute element={<Messaging />} />} />
          <Route path="/roleapplications" element={<ProtectedRoute element={<ApplyForRole />} />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
