import React from 'react';
import SearchResults from '../Search/SearchResults'
import { useAuth } from '../../AuthContext' // Импортируем хук useAuth


const ProjectsList = () => {
  const { isLoggedIn } = useAuth();

return (
  <div>    
    {isLoggedIn ? (
      <SearchResults />
    ) : (
      <p>Please log in to see the projects list.</p>
    )}
  </div>
);
};


export default ProjectsList;
