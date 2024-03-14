import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './Search.css';

const SearchResults = () => {
   const location = useLocation();
   const searchQuery = new URLSearchParams(location.search).get('search');
   const [searchResults, setSearchResults] = useState([]);

   useEffect(() => {
      const fetchData = async () => {
         try {
            if (!searchQuery) {
                setSearchResults([]);
               return;
            }
            const response = await fetch(`http://localhost:8000/api/v1/projects?search=${encodeURIComponent(searchQuery)}`);
            const data = await response.json();
            setSearchResults(data.data);
         } catch (error) {
            console.error('Error:', error);
         }
      };

      fetchData();
   }, [searchQuery]);

   return (
      <div className="searchResults">
         <h2>Search Results: {searchQuery}</h2>
         <ul className="container">
            {searchResults.map(item => (
               item.status !== 'Completed' && (
                  <li key={item._id}>
                     <h3>{item.title}</h3>
                     <p>Description: {item.description}</p>
                     <p>Status: {item.status}</p>
                     <p>Technologies: {item.technologies && item.technologies.frontend.join(', ')}</p>
                     <p>Roles Needed: {item.rolesNeeded && item.rolesNeeded.join(', ')}</p>
                  </li>
               )
            ))}
         </ul>
      </div>
   );
};

export default SearchResults;
