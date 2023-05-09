import React from 'react';
import './QueueSidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle, faPauseCircle, faForward, faBackward, faPlay, faTimes } from '@fortawesome/free-solid-svg-icons';

function QueueSidebar({
  queue,
  setQueue,
  playNextVideo,
  playPreviousVideo,
  currentVideoIndex,
  isPlaying,
  togglePlayPause,
  history,
  setCurrentVideoIndex,
}) {
  const nowPlaying = queue[currentVideoIndex];

  const removeFromQueue = (index) => {
    if (index < currentVideoIndex) {
      setCurrentVideoIndex((prevIndex) => prevIndex - 1);
    } else if (index === currentVideoIndex) {
      playNextVideo();
    }
    setQueue((prevQueue) => prevQueue.filter((_, i) => i !== index));
  };
  


  const renderQueueItem = (item, index) => (
    <div key={index} className="queue-item">
      <span>{item.snippet.title}</span>
      <div className="queue-item-actions">
        <FontAwesomeIcon icon={faPlay} onClick={() => playNextVideo(index)} />
        <FontAwesomeIcon icon={faTimes} onClick={() => removeFromQueue(index)} />
      </div>
    </div>
  );

  return (
    <div className="queue-sidebar">
      <div className="now-playing">
        <h4>Now Playing</h4>
        <div className="song-title">{nowPlaying?.snippet.title}</div>
        <div className="player-controls">
          <FontAwesomeIcon icon={faBackward} onClick={playPreviousVideo} />
          {isPlaying ? (
            <FontAwesomeIcon icon={faPauseCircle} onClick={togglePlayPause} />
          ) : (
            <FontAwesomeIcon icon={faPlayCircle} onClick={togglePlayPause} />
          )}
          <FontAwesomeIcon icon={faForward} onClick={playNextVideo} />
        </div>
      </div>
      <div className="queue">
        <h4>Queue</h4>
        {queue.map(renderQueueItem)}
      </div>
      <div className="history">
        <h4>History</h4>
        {history.map(renderQueueItem)}
      </div>
    </div>
  );
}

export default QueueSidebar;
