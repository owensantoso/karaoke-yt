import React from 'react';
import './SearchResults.css';

const SearchResults = ({ searchResults, addToQueue }) => {
  return (
    <div className="search-results">
      {searchResults.map((video, index) => (
        <div key={index} className="search-result" onClick={() => addToQueue(video)}>
          <img className="thumbnail" src={video.snippet.thumbnails.default.url} alt={video.snippet.title} />
          <div className="search-result-title">{video.snippet.title}</div>
        </div>
      ))}
    </div>
  );
};

export default SearchResults;
