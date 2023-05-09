import React, { useState } from 'react';
import './SearchBar.css';

const SearchBar = ({ handleSearchResults }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const API_KEY = 'AIzaSyDUUZPrvUOaltkN4HaNBwzl9Redk3S1b9o';
    const searchQuery = `${searchTerm} karaoke カラオケ歌っちゃ王`;
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${searchQuery} karaoke&type=video&key=${API_KEY}`;


    try {
      const response = await fetch(url);
      const data = await response.json();
      handleSearchResults(data.items);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="search-bar">
      <input
        type="text"
        placeholder="Search for a karaoke song..."
        value={searchTerm}
        onChange={handleChange}
        className="search-input"
      />
      <button type="submit" className="search-button">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
