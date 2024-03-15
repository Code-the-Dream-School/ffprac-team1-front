import React, { useState, useEffect } from 'react';
import Search from './SearchBar';
import { useLocation } from 'react-router-dom';
import './Search.css';

const SearchResults = () => {
   const location = useLocation();
   const searchQuery = new URLSearchParams(location.search).get('search');
   const [searchResults, setSearchResults] = useState([]);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      const fetchData = async () => {
         try {
            if (!searchQuery) {
               setSearchResults([]);
               setLoading(false);
               return;
            }
            const response = await fetch(`http://localhost:8000/api/v1/projects?search=${encodeURIComponent(searchQuery)}`);
            const data = await response.json();
            setSearchResults(data.data);
            setLoading(false);
         } catch (error) {
            console.error('Error:', error);
            setLoading(false);
         }
      };

      fetchData();
   }, [searchQuery]);

   return (
      <div className="searchResults">
         <Search />
         <h2>Search Results: {searchQuery}</h2>
         {loading && <div>Loading...</div>}
         {!loading && searchResults.length === 0 && <div>No projects found.</div>}
         {!loading && searchResults.length > 0 && (
            <ul className="container">
               {searchResults.map((item, index) => (
                  item.status !== 'Completed' && index < 10 && (
                     <li key={item._id}>
                        <div className="projectBox">
                           <h3>{item.title}</h3>
                           <p>Technologies:</p>
                           <ul>{renderTechnologies(item.technologies)}</ul>
                           <p className="projectStatus">{item.status}</p>
                           <p>See details...</p>
                        </div>
                        {item.missingWords && item.missingWords.length > 0 && (
                           <p className="missingWords"><em>Missing Words: <span style={{textDecoration: 'line-through'}}>{item.missingWords.join(', ')}</span></em></p>
                        )}
                     </li>
                  )
               ))}
            </ul>
         )}
      </div>
   );
};

const renderTechnologies = (technologies) => {
   if (!technologies) return null;

   const allTech = [];
   for (const type in technologies) {
      allTech.push(...technologies[type]);
   }

   const displayedTech = allTech.slice(0, 4);
   const etcTechCount = allTech.length - displayedTech.length;

   return (
      <div>
         {displayedTech.map((tech, index) => (
            <li key={index}>• {tech}</li>
         ))}
         {etcTechCount > 0 && <li>etc. ({etcTechCount} more)</li>}
      </div>
   );
};

export default SearchResults;
