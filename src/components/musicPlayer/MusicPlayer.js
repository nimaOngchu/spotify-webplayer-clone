import React, { Component, Fragment } from 'react';
import './musicPlayer.css';

export class MusicPlayer extends Component {
  render() {
    return (
      <Fragment>
        <div className="musicPlayer_contianer">
          <audio controls style={{ width: '40%' }}>
            <source src="horse.ogg" type="audio/ogg" />
          </audio>
        </div>
      </Fragment>
    );
  }
}

export default MusicPlayer;
