import React, { Component } from 'react';
import './musicplayer.css';
import SongInfo from './song-info/SongInfo';
import Controller from './controller/Controller';
import OngchuSlider from './ongchuSlider/OngchuSlider';
import Song from '../../utility/Audio';
import { connect } from 'react-redux';
import { setCurrentSongIndex, setIsSongPlaying } from '../../stateStore/actions';

class MusicPlayer extends Component {
  constructor() {
    super();

    this.state = {
      currentSongIndex: 0,

      volume: 100,
      sliderValue: 0,
      currentTime: 0
    };
  }

  componentDidMount() {
    this.loadSong();
    setInterval(this.autoPlayNextSong, 100);
  }
  changeSliderValue = (value, name) => {
    if (name === 'progressBar') {
      this.setState({ sliderValue: value });
      Song.currentTime = (value / 100) * Song.duration;
    } else if (name === 'volume') {
      this.setState({ volume: value });
      Song.volume = (value / 100).toFixed(2);
    }
  };
  loadSong = () => {
    Song.src = this.props.playlist
      ? this.props.playlist[this.props.currentSongIndex].src
      : null;
  };
  autoPlayNextSong = () => {
    let updateProgressBar = ((Song.currentTime / Song.duration) * 100).toFixed(
      3
    );
    this.setState({ sliderValue: updateProgressBar });
    this.setState({ currentTime: Song.currentTime });
    if (Song.ended) {
      this.nextSong();
    }
  };
  playPause = () => {
    if (Song.paused) {
      Song.play();
      this.props.setIsSongPlaying(true);
    } else {
      Song.pause();
      this.props.setIsSongPlaying(false);
    }
  };
  nextSong = () => {
    this.props.setIsSongPlaying(true);
    if (this.props.currentSongIndex < this.props.playlist.length - 1) {
      this.props.setCurrentSongIndex(this.props.currentSongIndex + 1);
      Song.src = this.props.playlist[this.props.currentSongIndex + 1].src;

      // this.setState({ currentSongIndex: this.state.currentSongIndex + 1 });
    } else {
      this.props.setCurrentSongIndex(0);
      // this.setState({ currentSongIndex: 0 });
      Song.src = this.props.playlist[0].src;
    }

    Song.play();
  };

  prevSong = () => {
    this.props.setIsSongPlaying(true);
    if (this.props.currentSongIndex === 0) {
      this.props.setCurrentSongIndex(this.props.playlist.length - 1);
      // this.setState({ currentSongIndex: this.props.playlist.length - 1 });
      Song.src = this.props.playlist[this.props.playlist.length - 1].src;
    } else {
      this.props.setCurrentSongIndex(this.props.currentSongIndex - 1);
      // this.setState({ currentSongIndex: this.state.currentSongIndex - 1 });
      Song.src = this.props.playlist[this.props.currentSongIndex - 1].src;
    }

    Song.play();
  };

  render() {
    const { currentSongIndex, playlist } = this.props;
    let currentSongInfo = playlist ? playlist[currentSongIndex] : null;
    return (
      <div className="muicplayer-conatainer">
        <div className="song-info-contianer">
          {' '}
          {currentSongInfo && (
            <SongInfo
              songTitle={currentSongInfo.song_name}
              artists={currentSongInfo.artists}
              image={currentSongInfo.image}
            />
          )}
        </div>

        <div className="slider-controls">
          <Controller
            playPause={this.playPause}
            prevSong={this.prevSong}
            nextSong={this.nextSong}
            shuffle={this.shuffle}
            repeat={this.repeat}
            song={Song}
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
              {(Song.duration / 100).toFixed(2)}
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
          />
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  currentSongIndex: state.playlists.currentSongIndex
});
export default connect(
  mapStateToProps,
  { setCurrentSongIndex , setIsSongPlaying}
)(MusicPlayer);
