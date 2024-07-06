import React from 'react';
import './SearchBar.css';
const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="search-container">
    <input
      type="text"
      placeholder="Search by title..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      className="search-input"
    />
  </div>
  );
};

export default SearchBar;