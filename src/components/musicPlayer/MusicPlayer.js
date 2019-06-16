import React, { Component } from 'react';
import './musicplayer.css';
import SongInfo from './song-info/SongInfo';
import Controller from './controller/Controller';

import OngchuSlider from './ongchuSlider/OngchuSlider';
const song = new Audio();

class MusicPlayer extends Component {
  constructor() {
    super();

    this.state = {
      currentSongIndex: 0,
      playPauseButton: 'play_circle_outline',
      muted: false,
      volume: 100,
      sliderValue: 0,
      currentTime: 0
    };
  }

  componentDidMount() {

    setInterval(this.autoPlayNextSong, 100);
  }
  changeSliderValue = (value, name) => {
    if (name === 'progressBar') {
      this.setState({ sliderValue: value });
      song.currentTime = (value / 100) * song.duration;
    } else if (name === 'volume') {
      this.setState({ volume: value });
    }
  };
  loadSong = () => {
    if (this.props.currentSongInfo) {
      song.src = this.props.playlist[this.state.currentSongIndex].src;
    }
  };
  autoPlayNextSong = () => {
    let updateProgressBar = ((song.currentTime / song.duration) * 100).toFixed(
      3
    );
    this.setState({ sliderValue: updateProgressBar });
    this.setState({ currentTime: song.currentTime });
    if (song.ended) {
      this.nextSong();
    }
  };
  playPause = () => {
    if (song.paused) {
      song.play();
      this.setState({ playPauseButton: 'pause_circle_outline' });
    } else {
      song.pause();
      this.setState({ playPauseButton: 'play_circle_outline' });
    }
  };
  nextSong = () => {
    if (this.state.currentSongIndex < this.props.playlist.length - 1) {
      song.src = this.props.playlist[this.state.currentSongIndex + 1].src;
      this.setState({ currentSongIndex: this.state.currentSongIndex + 1 });
    } else {
      this.setState({ currentSongIndex: 0 });
      song.src = this.props.playlist[0].src;
    }
    this.setState({ playPauseButton: 'pause_circle_outline' });
    song.play();
  };

  adjustVolume = volume => {
    song.volume = (volume / 100).toFixed(2);
  };

  prevSong = () => {
    if (this.state.currentSongIndex === 0) {
      this.setState({ currentSongIndex: this.props.playlist.length - 1 });
      song.src = this.props.playlist[this.props.playlist.length - 1].src;
    } else {
      this.setState({ currentSongIndex: this.state.currentSongIndex - 1 });
      song.src = this.props.playlist[this.state.currentSongIndex - 1].src;
    }
    this.setState({ playPauseButton: 'pause_circle_outline' });
    song.play();
  };
  render() {
    this.loadSong();
    let currentSongInfo = this.props.playlist[this.state.currentSongIndex];
    return (
      <div className="muicplayer-conatainer">
        <div className ='song-info-contianer'>   <SongInfo
          songTitle={currentSongInfo.song_name}
          albumName={currentSongInfo.artist}
          image={currentSongInfo.image}
        /></div>

        <div className="slider-controls">
          <Controller
            playPause={this.playPause}
            prevSong={this.prevSong}
            nextSong={this.nextSong}
            shuffle={this.shuffle}
            repeat={this.repeat}
            playPauseButton={this.state.playPauseButton}
          />
          <div className="slider-time-container">
            <div className="song-duration">
              {(this.state.currentTime / 100).toFixed(2)}
            </div>
            <OngchuSlider
              sliderName="progressBar"
              value={this.state.sliderValue}
              changeValue={this.changeSliderValue}
            />
            <div className="song-duration">
              {(song.duration / 100).toFixed(2)}
            </div>
          </div>
        </div>
        <div className="playlist-volume-container">
          <i className="material-icons">list_alt</i>
          <i className="material-icons">volume_down</i>
          <OngchuSlider
            sliderName="volume"
            value={this.state.volume}
            changeValue={this.changeSliderValue}
            adjustVolume={this.adjustVolume}
          />
        </div>
      </div>
    );
  }
}
export default MusicPlayer;
