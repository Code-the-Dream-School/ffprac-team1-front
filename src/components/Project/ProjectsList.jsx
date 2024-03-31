import React from 'react';
import { useAuth } from '../../AuthContext';
import SearchResults from '../Search/SearchResults.jsx';

const ProjectsList = () => {
  const { isLoggedIn } = useAuth();

  return (
    <div>
      {isLoggedIn ? (
        <SearchResults />
      ) : (
        <div>In need to login.</div>
      )}
    </div>
  );
};

export default ProjectsList;
