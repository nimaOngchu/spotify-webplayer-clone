import React, { Component } from 'react';
import { List, Icon, Grid } from 'semantic-ui-react';
import Song from '../../../utility/Audio';

class TrackList extends Component {
  state = {
    musicIcon: true,
    songIndex: null,
    songPlaying: false
  };
  componentDidMount() {
    console.log('component mounted');
    if (
      this.props.isSongPlaying &&
      this.props.currentPlaylist.id ===
        this.props.setCurrentlyPlayingPlaylist.id
    ) {
      this.props.changeLocalSongIndex(this.props.globalSongIndex);
    }
  }
  handleActiveClass = () => {
    if (this.props.isSongPlaying) {
    }
    if (
      this.props.currentlyPlayingPlaylist &&
      this.props.currentlyPlayingPlaylist.id ===
        this.props.currentPlaylist.id &&
      this.props.globalSongIndex === this.props.song.trackIndex
    ) {
      return 'currentlyPlaying ';
    }
  };

  formatArtists = artists => {
    let foramtedArtist = '';
    artists.map(artist => {
      foramtedArtist = foramtedArtist.concat(artist + ', ');
      return null;
    });
    return foramtedArtist.slice(0, -2);
  };
  onSelect = () => {
    // this.setState({ musicIcon:true });
  };
  onTrackLeave = () => {
    // this.setState({musicIcon:false})
  };
  handleIconName = () => {
    if (this.props.isSongPlaying) {
    }
    if (
      this.props.currentlyPlayingPlaylist &&
      this.props.currentlyPlayingPlaylist.id ===
        this.props.currentPlaylist.id &&
      this.props.globalSongIndex === this.props.song.trackIndex
    ) {
      if (Song.paused) {
        return 'play';
      } else {
        return 'pause';
      }
    } else {
      return 'music'
    }
  };
  playMusic = () => {
    this.props.setIsSongPlaying(true);
    if (
      this.props.currentlyPlayingPlaylist &&
      this.props.currentlyPlayingPlaylist.id ===
        this.props.currentPlaylist.id &&
      this.props.globalSongIndex === this.props.song.trackIndex
    ) {
      if (Song.paused) {
        Song.play();
      } else {
        Song.pause();
      }
    } else {
      Song.src = this.props.currentPlaylist.songs[
        this.props.song.trackIndex
      ].src;
      this.props.setGlobalSongIndex(this.props.song.trackIndex);
      this.props.setCurrentlyPlayingPlaylist(this.props.currentPlaylist);
      Song.play();
      console.log('componet new');
    }
  };
  render() {
    // this.checkCurrentlyPlaying();
    const { song, globalSongIndex, localSongIndex } = this.props;

    return (
      <div
        className="trackList-overlay"
        onMouseEnter={this.setState}
        onMouseLeave={this.onTrackLeave}>
        <List.Item>
          <Grid className={this.handleActiveClass()}>
            <Grid.Column
              style={{ display: 'flex', alignItems: 'center' }}
              width={14}>
              <Icon
                name={this.handleIconName()}
                style={{ marginRight: '.5rem' }}
                onClick={this.playMusic}
              />
              <List.Content>
                <List.Header>{song.song_name}</List.Header>
                <List.Description>
                  {this.formatArtists(song.artists)}
                  <span style={{ padding: '3px', fontStyle: 'bolder' }}>-</span>
                  <span style={{ fontStyle: 'italic' }}>{song.albumName}</span>
                </List.Description>
              </List.Content>
            </Grid.Column>
            <Grid.Column width={2}>
              <span>{Math.round(song.duration * 100) / 100}</span>
            </Grid.Column>
          </Grid>
        </List.Item>
      </div>
    );
  }
}

export default TrackList;
