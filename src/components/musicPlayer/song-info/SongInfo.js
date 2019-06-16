import React from 'react';
import './songInfo.css';

export default function SongInfo(props) {
  return (
    <div>
      <div className="song-info-container">
        <img src={props.image} alt={props.songName} />
        <div className="text">
          <div>{props.songTitle}</div>
          <div>{props.albumName}</div>
        </div>
      </div>
    </div>
  );
}
