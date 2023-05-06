import React from 'react';
import './QueueSidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle, faPauseCircle, faForward, faBackward } from '@fortawesome/free-solid-svg-icons';


function QueueSidebar({ queue, playNextVideo, playPreviousVideo, currentVideoIndex, isPlaying, togglePlayPause, history }) {
  const nowPlaying = queue[currentVideoIndex];

  const renderQueueItem = (item, index) => (
    <div key={index} className="queue-item">
      <span>{item.snippet.title}</span>
      <div className="queue-item-actions">
        <i className="fas fa-play" onClick={() => playNextVideo(item)}></i>
        <i className="fas fa-times" onClick={() => playPreviousVideo(item)}></i>

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
