import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Search.css';
import {useAuth} from '../../AuthContext'

const Search = ({ className }) => {
  const { isLoggedIn } = useAuth(); // Получаем значение isLoggedIn из контекста
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearchInputChange = event => {
    setSearchQuery(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (searchQuery.trim()) {
      const searchPath = isLoggedIn ? '/projects-list' : '/search-results';
      navigate(`${searchPath}?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  }

  const handleKeyDown = event => {
    if (event.key === 'Enter') {
      handleSubmit(event);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className={`search-area ${className || 'w-3/4'}`}
          placeholder="Search your first project..."
          value={searchQuery}
          onChange={handleSearchInputChange}
          onKeyDown={handleKeyDown}
        />
      </form>
    </>
  );
};

export default Search;
