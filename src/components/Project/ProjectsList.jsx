import React from 'react';
import SearchResults from '../Search/SearchResults';

const ProjectsList = ( {isLoggedIn }) => {

  return (
  <div>    
    <SearchResults isLoggedIn={isLoggedIn}/>
  </div>
  )
}


export default ProjectsList;
