import React, { useState, useEffect } from 'react';
import Search from './SearchBar';
import { useLocation } from 'react-router-dom';
import './Search.css';
import ProjectCard from '../Project/ProjectCard_unauthUsers.jsx';
import Pagination from '../Layout/Pagination.jsx';

const SearchResults = ({isLoggedIn}) => {
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get('search');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 4;

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!searchQuery) {
          const response = await fetch(
            `http://localhost:8000/api/v1/projects`
          );
          const data = await response.json();
          setSearchResults(data.data);
          setLoading(false);
          return;
        }

        const response = await fetch(
          `http://localhost:8000/api/v1/projects?search=${encodeURIComponent(searchQuery)}`
        );
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

  const filteredResults = !isLoggedIn ? searchResults.filter(item => item.status !== 'Completed') : searchResults;

  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = filteredResults.slice(
    indexOfFirstProject,
    Math.min(indexOfLastProject, filteredResults.length),
  );

  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div className="searchResults">
      <Search className="w-2/4 mx-auto" isLoggedIn={isLoggedIn}/>
      {searchQuery ? (
        <h2>Search Results: {searchQuery}</h2>
      ) : (
        <h2>Browse Projects:</h2>
      )}
      {loading && <div>Loading...</div>}
      {!loading && filteredResults.length === 0 && <div className='text-center'>No projects found.</div>}
      {!loading && filteredResults.length > 0 && (
        <div className="searchResultsList">
          {currentProjects.map((item, index) => (
            <div key={item._id}>
              <ProjectCard project={item} />
              {item.missingWords && item.missingWords.length > 0 && (
                <p className="missingWords">
                  <em>
                    Missing Words:{' '}
                    <span style={{ textDecoration: 'line-through' }}>
                      {item.missingWords.join(', ')}
                    </span>
                  </em>
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

export default SearchResults;
