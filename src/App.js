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

// App.js

const playNextVideo = () => {
  if (currentVideoIndex + 1 < queue.length) {
    const nextVideoIndex = currentVideoIndex + 1;
    setHistory([...history, queue[currentVideoIndex]]);
    setQueue(queue.filter((_, i) => i !== currentVideoIndex));
    setCurrentVideoIndex(nextVideoIndex - 1); // Subtract 1 because the queue has shifted
    setIsPlaying(false);
    setTimeout(() => {
      setIsPlaying(true);
    }, 1000);
  }
};

  
  /* this version of playNextVideo works but without removal in the queue.
  const playNextVideo = () => {
    if (currentVideoIndex + 1 < queue.length) {
      setHistory([...history, queue[currentVideoIndex]]);
      setCurrentVideoIndex(currentVideoIndex + 1);
      setIsPlaying(true);
    }
  };

  */
  

  /* this version works with removal
    const playNextVideo = () => {
    if (currentVideoIndex + 1 < queue.length) {
      const nextVideoIndex = currentVideoIndex + 1;
      setHistory([...history, queue[currentVideoIndex]]);
      setQueue(queue.filter((_, i) => i !== currentVideoIndex));
      setCurrentVideoIndex(nextVideoIndex - 1); // Subtract 1 because the queue has shifted
      setIsPlaying(false);
      setTimeout(() => {
        setIsPlaying(true);
      }, 1000);
    }
  };
  */
  
  const playPreviousVideo = () => {
    if (currentVideoIndex > 0) {
      setCurrentVideoIndex(currentVideoIndex - 1);
      setIsPlaying(true);
    }
  };

  const togglePlayPause = () => {
    console.log("togglePlayPause called");
    setIsPlaying(!isPlaying);
    console.log("isPlaying state after toggle: ", !isPlaying);
  };

  const handleVideoEnd = () => {
    playNextVideo();

  };

  return (
    <div className="app">
      <div className="sidebar">
        <QueueSidebar
          queue={queue}
          setQueue={setQueue}
          playNextVideo={playNextVideo}
          playPreviousVideo={playPreviousVideo}
          currentVideoIndex={currentVideoIndex}
          isPlaying={isPlaying}
          togglePlayPause={togglePlayPause}
          history={history}
          setCurrentVideoIndex={setCurrentVideoIndex}
        />
      </div>
      <div className="main-content">
        <YouTubePlayer
          videoId={queue[currentVideoIndex]?.id.videoId}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          onStateChange={setPlayerState}
          onVideoEnd={handleVideoEnd}
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
