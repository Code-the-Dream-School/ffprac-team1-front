import React, { useState, useEffect } from 'react';
import { useAuth } from '../../AuthContext';
import SearchResults from '../Search/SearchResults';
import { fetchProfile } from '../../util/fetchData';

const ProjectsList = () => {
  const { isLoggedIn } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const profileData = await fetchProfile();
        setProfile(profileData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching profile data:', error);
        setLoading(false);
      }
    };

    if (isLoggedIn) {
      fetchProfileData();
    }
  }, [isLoggedIn]);

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : isLoggedIn ? (
        <SearchResults profile={profile} />
      ) : (
        <div>You need to login.</div>
      )}
    </div>
  );
};

export default ProjectsList;
