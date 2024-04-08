import React, { useState, useEffect } from 'react';
import Search from './SearchBar';
import { useLocation } from 'react-router-dom';
import ProjectCard from '../Project/ProjectCard';
import Pagination from '../Layout/Pagination';
import { fetchProjects } from '../../util/fetchData';

const SearchResults = () => {
  const location = useLocation();
  const search = new URLSearchParams(location.search).get('search');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(5);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const { data, totalPages } = await fetchProjects(search, page, limit);
      setSearchResults(data);
      setTotalPages(totalPages);
      setLoading(false);
    };

    fetchData();
  }, [search, page, limit]);

  const paginate = pageNumber => {
    setPage(pageNumber);
  };

  return (
    <div className="m-5">
      <Search className="w-2/4 mx-auto block" />
      {search ? (
        <h2 className="pt-[6vh] pb-[10vh]">Search Results: {search}</h2>
      ) : (
        <h2 className="pt-[6vh] pb-[10vh]">Browse Projects:</h2>
      )}
      {loading && <div>Loading...</div>}
      {!loading && searchResults.length === 0 && (
        <div className="text-center">No projects found.</div>
      )}
      {!loading && searchResults.length > 0 && (
        <>
          <div className="flex flex-wrap justify-center p-0 m-0 list-none text-xs">
            {searchResults.map((item, index) => (
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
          <div className="flex justify-center p-10">
            <Pagination currentPage={page} totalPages={totalPages} paginate={paginate} />
          </div>
        </>
      )}
    </div>
  );
};

export default SearchResults;