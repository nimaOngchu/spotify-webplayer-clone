import React from 'react';
import './controller.css';
export function Controller(props) {
  return (
    <div className="controller-container">
      <i className="material-icons" onClick={props.shuffle}>
        shuffle
      </i>
      <i className="material-icons" onClick={props.prevSong}>
        skip_previous
      </i>
      <i className="material-icons" style={{fontSize:'2.8rem'}} onClick={props.playPause}>
        {props.playPauseButton}
      </i>
      <i className="material-icons" onClick={props.nextSong}>
        skip_next
      </i>
      <i className="material-icons" onClick={props.repeat}>
        repeat
      </i>
    </div>
  );
}

export default Controller;
