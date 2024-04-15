import React, { useState, useEffect } from 'react';
import { useAuth } from '../../AuthContext';
import SearchResults from '../Search/SearchResults.jsx';
import { fetchProfile } from '../../util/fetchData.js';

const ProjectsList = () => {
  const { isLoggedIn } = useAuth();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      const profileData = await fetchProfile();
      setProfile(profileData);
    };

    if (isLoggedIn) {
      fetchProfileData();
    }
  }, [isLoggedIn]);

  return (
    <div>{isLoggedIn ? <SearchResults profile={profile} /> : <div>You need to login.</div>}</div>
  );
};

export default ProjectsList;
