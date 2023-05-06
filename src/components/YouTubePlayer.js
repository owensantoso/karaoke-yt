import './YouTubePlayer.css';
import React, { useEffect, useRef } from 'react';

function YouTubePlayer({ videoId, isPlaying, playerState, onStateChange, onVideoEnd }) {
  const playerRef = useRef(null);

  useEffect(() => {
    if (window.YT) {
      createPlayer();
    } else {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      window.onYouTubeIframeAPIReady = createPlayer;
      document.body.appendChild(tag);
    }

    function createPlayer() {
      playerRef.current = new window.YT.Player('player', {
        height: '100%',
        width: '100%',
        videoId: videoId,
        events: {
          onStateChange: handleStateChange,
        },
      });
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
      }
    };
  }, [videoId]);

  const handleStateChange = (event) => {
    if (onStateChange) {
      onStateChange(event.data);
    }
    if (event.data === window.YT.PlayerState.ENDED && onVideoEnd) {
      onVideoEnd();
    }
  };

  useEffect(() => {
    if (playerRef.current) {
      if (isPlaying && playerState !== window.YT.PlayerState.PLAYING) {
        playerRef.current.playVideo();
      } else if (!isPlaying && playerState === window.YT.PlayerState.PLAYING) {
        playerRef.current.pauseVideo();
      }
    }
  }, [isPlaying, playerState]);

  return <div id="player"></div>;
}

export default YouTubePlayer;
