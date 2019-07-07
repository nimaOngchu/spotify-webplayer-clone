import React, { Component } from 'react';
import { List, Icon, Grid } from 'semantic-ui-react';
import Song from '../../../utility/Audio';

class TrackList extends Component {
  state = {
    iconName: 'music',
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
  checkCurrentlyPlaying = () => {
    if (this.props.isSongPlaying) {
    }
    if (
      this.props.currentlyPlayingPlaylist &&
      this.props.currentlyPlayingPlaylist.id === this.props.currentPlaylist.id
    ) {
      console.log('they are same');
      this.props.changeLocalSongIndex(this.props.globalSongIndex);
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
    this.setState({ iconName: 'play' });
  };
  onTrackLeave = () => {
    !this.state.songPlaying && this.setState({ iconName: 'music' });
  };
  playMusic = () => {
    // this.props.setIsSongPlaying(true)
    Song.src = this.props.currentPlaylist.songs[this.props.song.trackIndex].src;
    Song.play();
    this.setState({
      songPlaying: true
    });
    this.props.setGlobalSongIndex(this.props.song.trackIndex);
    this.props.changeLocalSongIndex(this.props.song.trackIndex);
    this.props.setCurrentlyPlayingPlaylist(this.props.currentPlaylist);
    this.props.globalSongIndex === this.props.song.trackIndex && Song.paused
      ? this.setState({ iconName: 'play' })
      : this.setState({ iconName: 'pause' });
  };
  render() {
    // this.checkCurrentlyPlaying();
    const { song, globalSongIndex, localSongIndex } = this.props;
    console.log('tracklist');
    return (
      <div
        className="trackList-overlay"
        onMouseEnter={this.onSelect}
        onMouseLeave={this.onTrackLeave}>
        <List.Item>
          <Grid
            className={
              this.props.localSongIndex === this.props.song.trackIndex
                ? 'currentlyPlaying '
                : ''
            }>
            <Grid.Column
              style={{ display: 'flex', alignItems: 'center' }}
              width={14}>
              <Icon
                name={this.state.iconName}
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
