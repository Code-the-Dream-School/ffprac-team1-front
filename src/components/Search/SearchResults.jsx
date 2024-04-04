import React, { useState, useEffect } from 'react';
import Search from './SearchBar';
import { useLocation } from 'react-router-dom';
import './Search.css';
import ProjectCard from '../Project/ProjectCard.jsx';
import Pagination from '../Layout/Pagination.jsx';
import { useAuth } from '../../AuthContext';
import { fetchProjects } from '../../util/fetchData';

const SearchResults = () => {
  const { isLoggedIn } = useAuth();
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get('search');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [projectsPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchProjects(searchQuery, isLoggedIn);
      setSearchResults(data);
      setLoading(false);
    };

    fetchData();
  }, [searchQuery, isLoggedIn]);

  useEffect(() => {
    setTotalPages(Math.ceil(searchResults.length / projectsPerPage));
  }, [searchResults, projectsPerPage]);

  const filteredResults = isLoggedIn ? searchResults : searchResults.filter(item => item.status !== 'Completed');

  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = filteredResults.slice(
    indexOfFirstProject,
    Math.min(indexOfLastProject, filteredResults.length),
  );

  return (
    <div className="searchResults">
      <Search className="w-2/4 mx-auto" />
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
      <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate} />
      </div>
    </div>
  );
};

export default SearchResults;
