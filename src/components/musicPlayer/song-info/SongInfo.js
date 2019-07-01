import React from 'react';
import './songInfo.css';

export default function SongInfo(props) {
  const formatArtists = (artists) => {
    let foramtedArtist =''
    artists.map(artist => {
      foramtedArtist = foramtedArtist.concat(artist + ', ');
      return null;
    })
    return foramtedArtist.slice(0, -2)

  }
  return (
    <div>
      <div className="song-info-container">
        <img src={props.image} alt={props.songName} />
        <div className="text">
          <div style ={{fontStyle: 'bold'}}>{props.songTitle}</div>
          <div>{formatArtists(props.artists)}</div>
        </div>
      </div>
    </div>
  );
}
