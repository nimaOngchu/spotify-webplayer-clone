import React, { Component } from 'react';
import { List, Icon, Grid } from 'semantic-ui-react';
import Song from '../../../utility/Audio';

class TrackList extends Component {
  state = {
    musicIcon: true,
    songIndex: null,

    normalIcon: 'music'
  };

  handleActiveClass = () => {
    if (
      this.props.currentlyPlayingPlaylist &&
      this.props.currentlyPlayingPlaylist.id ===
        this.props.currentPlaylist.id &&
      this.props.globalSongIndex === this.props.song.trackIndex
    ) {
      return true;
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
    this.setState({ normalIcon: 'play' });
  };
  onTrackLeave = () => {
    this.setState({ normalIcon: 'music' });
  };
  handleIconName = () => {
    // if (this.props.isSongPlaying) {
    // }
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
      return 'play';
    }
  };
  playMusic = () => {
    if (
      this.props.currentlyPlayingPlaylist &&
      this.props.currentlyPlayingPlaylist.id ===
        this.props.currentPlaylist.id &&
      this.props.globalSongIndex === this.props.song.trackIndex
    ) {
      if (Song.paused) {
        Song.play();

        this.props.setIsSongPlaying(true);
      } else {
        Song.pause();

        this.props.setIsSongPlaying(false);
      }
    } else {
      Song.src = this.props.currentPlaylist.songs[
        this.props.song.trackIndex
      ].src;
      this.props.setGlobalSongIndex(this.props.song.trackIndex);
      this.props.setCurrentlyPlayingPlaylist(this.props.currentPlaylist);
      Song.play();
      this.setState({ selectedIcon: 'pause' });
    }
  };
  render() {
    const { song } = this.props;

    return (
      <div
        className="trackList-overlay"
        onMouseEnter={this.onSelect}
        onMouseLeave={this.onTrackLeave}>
        <List.Item>
          <Grid className={this.handleActiveClass() ? 'currentlyPlaying' : ''}>
            <Grid.Column
              style={{ display: 'flex', alignItems: 'center' }}
              width={14}>
              <div className="musicIcon-tracklist">
                <Icon
                  className={this.handleActiveClass() ? 'hide-musicIcon' : ''}
                  name={this.state.normalIcon}
                />
              </div>
              <Icon
                className={
                  this.handleActiveClass()
                    ? 'musicIcon-tracklist-when-selected'
                    : 'hide-musicIcon'
                }
                name={this.handleIconName()}
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
