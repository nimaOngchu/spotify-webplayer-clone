import React, { Component } from 'react';
import './playlistTracks.css';
import { connect } from 'react-redux';
import { Grid, List } from 'semantic-ui-react';
import TrackList from './TrackList';
import TrackListSummary from './TrackListSummary';

export class Playlist extends Component {

  render() {

    const { currentPlaylist } = this.props;

    const containerStyle = {
      padding: '2rem',
      height: '100%'
    };
    return (
      currentPlaylist && (
        <Grid style={{ containerStyle }} className="playlistContainer">
          <Grid.Column width={5} textAlign="center" style={{ paddingLeft: 60 }}>
            <TrackListSummary currentPlaylist={currentPlaylist}/>
          </Grid.Column>
          <Grid.Column width={10}>
            <List inverted>
              {currentPlaylist.songs &&
                currentPlaylist.songs.map(song => <TrackList song={song} key = {song.song_name}/>)}
            </List>
          </Grid.Column>
        </Grid>
      )
    );
  }
}
const mapStateToProps = state => ({
  currentPlaylist: state.playlists.currentPlaylist
});
export default connect(
  mapStateToProps,
  null
)(Playlist);
