import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import { fetchSearchSuggestions } from '../../util/fetchData';

const Search = ({ className, centered }) => {
  const { isLoggedIn } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  const fetchSuggestions = async word => {
    try {
      const newSuggestions = await fetchSearchSuggestions(word);
      setSuggestions(newSuggestions.slice(0, 5));
    } catch (error) {
      console.error('Error fetching search suggestions:', error);
      setSuggestions([]);
    }
  };

  const handleSearchInputChange = async event => {
    setSearchQuery(event.target.value);
    const trimmedQuery = event.target.value.trim();
    if (trimmedQuery !== '') {
      const words = trimmedQuery.split(/\W+/);
      const lastWord = words[words.length - 1];
      await fetchSuggestions(lastWord);
    } else {
      setSuggestions([]);
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (searchQuery.trim()) {
      const searchPath = isLoggedIn ? '/projects-list' : '/search-results';
      navigate(`${searchPath}?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleSuggestionClick = suggestion => {
    setSearchQuery(prevQuery => {
      const words = prevQuery.split(/\W+/);
      const withoutLastWord = words.slice(0, -1).join(' ');
      return `${withoutLastWord} ${suggestion}`;
    });
    setSuggestions([]);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ position: 'relative' }}>
        <input
          type="text"
          className={`search-area ${className || 'w-3/4'}`}
          placeholder="Search your first project..."
          value={searchQuery}
          onChange={handleSearchInputChange}
        />
        {suggestions.length > 0 && (
          <div
            style={{
              position: 'absolute',
              top: '100%',
              left: centered ? '50%' : 0,
              transform: centered ? 'translateX(-50%)' : 'none',
              width: centered ? 'auto' : '100%',
            }}
          >
            {suggestions.map((suggestion, index) => (
              <span
                key={index}
                style={{ display: 'inline-block', margin: '0 5px', cursor: 'pointer' }}
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </span>
            ))}
          </div>
        )}
      </div>
      <input type="submit" style={{ display: 'none' }} />
    </form>
  );
};

export default Search;
