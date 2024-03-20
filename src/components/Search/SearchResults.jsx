import React, { useState, useEffect } from 'react';
import Search from './SearchBar';
import { useLocation } from 'react-router-dom';
import './Search.css';
import ProjectCard from '../Project/ProjectCard_unauthUsers.jsx';
import Pagination from '../Layout/Pagination.jsx';

const SearchResults = () => {
   const location = useLocation();
   const searchQuery = new URLSearchParams(location.search).get('search');
   const [searchResults, setSearchResults] = useState([]);
   const [loading, setLoading] = useState(true);
   const [currentPage, setCurrentPage] = useState(1);
   const projectsPerPage = 2;

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

            const sortedResults = data.data.sort((a, b) => {
               const missingWordsA = a.missingWords ? a.missingWords.length : 0;
               const missingWordsB = b.missingWords ? b.missingWords.length : 0;
               
               return missingWordsA - missingWordsB;
            });

            setSearchResults(sortedResults);
            setLoading(false);
         } catch (error) {
            console.error('Error:', error);
            setLoading(false);
         }
      };

      fetchData();
   }, [searchQuery]);

   const filteredResults = searchResults.filter(item => item.status !== 'Completed');

   const indexOfLastProject = currentPage * projectsPerPage;
   const indexOfFirstProject = indexOfLastProject - projectsPerPage;
   const currentProjects = filteredResults.slice(indexOfFirstProject, Math.min(indexOfLastProject, filteredResults.length));

   const paginate = (pageNumber) => setCurrentPage(pageNumber);

   return (
      // <div className="searchResults">
      //    <Search className="w-2/4 mx-auto"/>
      //    <h2>Search Results: {searchQuery}</h2>
      //    {loading && <div>Loading...</div>}
      //    {!loading && filteredResults.length === 0 && <div>No projects found.</div>}
      //    {!loading && filteredResults.length > 0 && (
      //       <ul className="searchResultsList">
      //          {currentProjects.map((item, index) => (
      //             <li key={item._id}>
      //                <div className="projectBox">
      //                   <h3>{item.title}</h3>
      //                   <p>Technologies:</p>
      //                   <ul>{renderTechnologies(item.technologies)}</ul>
      //                   <p className="projectStatus">{item.status}</p>
      //                   <p>See details...</p>
      //                </div>
      //                {item.missingWords && item.missingWords.length > 0 && (
      //                   <p className="missingWords"><em>Missing Words: <span style={{textDecoration: 'line-through'}}>{item.missingWords.join(', ')}</span></em></p>
      //                )}
      //             </li>
      //          ))}
      //       </ul>
      //    )}
      //    <div className="flex flex-col items-center py-12">
      //       <Pagination
      //          currentPage={currentPage}
      //          totalPages={Math.ceil(filteredResults.length / projectsPerPage)}
      //          paginate={paginate}
      //       />
      //    </div>
      // </div>
   //    );
   // };



      <div className="searchResults">
         <Search className="w-2/4 mx-auto"/>
         <h2>Search Results: {searchQuery}</h2>
         {loading && <div>Loading...</div>}
         {!loading && filteredResults.length === 0 && <div>No projects found.</div>}
         {!loading && filteredResults.length > 0 && (
            <div className="searchResultsList">
               {currentProjects.map((item, index) => (
                  <div key={item._id}>
                     <ProjectCard project={item} /> 
                     {item.missingWords && item.missingWords.length > 0 && (
                        <p className="missingWords">
                           <em>Missing Words: <span style={{textDecoration: 'line-through'}}>{item.missingWords.join(', ')}</span></em>
                        </p>
                     )}
                  </div>
               ))}
            </div>
         )}
         <div className="flex flex-col items-center py-12">
            <Pagination
               currentPage={currentPage}
               totalPages={Math.ceil(filteredResults.length / projectsPerPage)}
               paginate={paginate}
            />
         </div>
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
