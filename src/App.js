import { useState } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import QueueSidebar from './components/QueueSidebar';
import YouTubePlayer from './components/YouTubePlayer';

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [queue, setQueue] = useState([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [history, setHistory] = useState([]);
  const [playerState, setPlayerState] = useState(null);

  const addToQueue = (video) => {
    setQueue([...queue, video]);
  };

  const playNextVideo = () => {
    if (currentVideoIndex + 1 < queue.length) {
      setHistory([...history, queue[currentVideoIndex]]);
      setCurrentVideoIndex(currentVideoIndex + 1);
      setIsPlaying(true);
    }
  };

  const playPreviousVideo = () => {
    if (currentVideoIndex > 0) {
      setCurrentVideoIndex(currentVideoIndex - 1);
      setIsPlaying(true);
    }
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleVideoEnd = () => {
    playNextVideo();
  };

  return (
    <div className="app">
      <div className="sidebar">
        <QueueSidebar
          queue={queue}
          playNextVideo={playNextVideo}
          playPreviousVideo={playPreviousVideo}
          currentVideoIndex={currentVideoIndex}
          isPlaying={isPlaying}
          togglePlayPause={togglePlayPause}
          history={history}
        />
      </div>
      <div className="main-content">
        <YouTubePlayer
          videoId={queue[currentVideoIndex]?.id.videoId}
          isPlaying={isPlaying}
          onStateChange={setPlayerState}
          onVideoEnd={playNextVideo}
        />
      </div>
      <div className="search-sidebar">
        <SearchBar handleSearchResults={setSearchResults} />
        <SearchResults searchResults={searchResults} addToQueue={addToQueue} />
      </div>
    </div>
  );
}

export default App;
