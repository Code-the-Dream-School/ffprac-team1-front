import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { getAllData } from './util/index';
import './App.css';

const URL = 'http://localhost:8000/api/v1/';

function App() {
  
  const [message, setMessage] = useState(''); 

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  useEffect(() => {

    (async () => {
      const myData = await getAllData(URL)
      setMessage(myData.data);
    })();
      
    return () => {
      console.log('unmounting');
    }

  }, []);

  return (
    <BrowserRouter>
      <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/projects">Browse Projects</Link></li>
        {!isLoggedIn && 
          <li>
            <Link to="/register">Join Now</Link>
          </li>}
          {!isLoggedIn ? (
            <li><Link to="/login">Sign In</Link></li>
          ) : (
            <>
              <li><Link to="/messaging">Messaging</Link></li>
              <li><Link to="/notification">Notification</Link></li>
              <li><Link to="/profile">Profile</Link></li>
              <li><Link to="/">Sign Out</Link></li>
            </>
          )}
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/create-profile" element={<CreateProfile />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/user-projects" element={<UserProjects />} />
        <Route path="/create-project" element={<CreateProject />} />
        <Route path="/messaging" element={<Messaging />} />
        <Route path="/notification" element={<Notification />} />
      </Routes>
    </BrowserRouter>
  );
}

const Home = () => (
  <div>
    <h1>This is home/welcome page.</h1>
  </div>
);

const Projects = () => (
  <div>
    <h1>Here you can browse list of all projects.</h1>
  </div>
);

const Login = ( {setIsLoggedIn} ) => {
  const navigate = useNavigate();
  setIsLoggedIn(true);
  navigate('/profile');

  return (
    <div>
      <h1>This is login page.</h1>
      <button onClick={() => navigate('/profile')}>Sign In</button>
      <h2>If you don't have account, please, <a href="/register"></a>Sign Up</h2>
      <button onClick={() => navigate('/register')}>Sign Up</button>
    </div>
  );
};

const Register = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>This is registration page.</h1>
      <button onClick={() => navigate('/create-profile')}>Register</button>
    </div>
  );
};
  
const CreateProfile = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Create your profile.</h1>
      <button onClick={() => navigate('/profile')}>Submit</button>
    </div>
  );
};

const Profile = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1>This is your profile. Here you can <a href='/edit-profile'>edit</a> you profile.</h1>
      <button onClick={() => navigate('/user-projects')}>Your projects</button>
    </div>
  );
};

const EditProfile = () => (
  <div>
    <h1>Edit your profile.</h1>
  </div>
)

const UserProjects = () => {
  const navigate = useNavigate();
  return (
  <div>
    <h1>List if your projects.</h1>
    <button onClick={() => navigate('/create-project')}>Create project</button>
  </div>
  );
};

const CreateProject = () => (
  <div>
    <h1>Create a new project.</h1>
  </div>
);

const Messaging = () => (
  <div>
    <h1>*This is your received messages.*</h1>
  </div>
);

const Notification = () => (
  <div>
    <h1>
      This is your notifications.
    </h1>
  </div>
);
  
export default App

