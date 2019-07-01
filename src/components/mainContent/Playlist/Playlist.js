import React, { Component } from 'react';
import './playlistTracks.css';
import { connect } from 'react-redux';
import { Grid, List } from 'semantic-ui-react';
import TrackList from './TrackList';
import TrackListSummary from './TrackListSummary';
import { setCurrentPlaylist } from '../../../stateStore/actions';
import setSpotifyWebApi from '../../../utility/Spotify';
export class Playlist extends Component {

  componentDidMount() {
    const id = this.props.match.params.id;
     setSpotifyWebApi.getSpotify
      .getPlaylist(id)
      .then(playlist => {
        this.props.setCurrentPlaylist(playlist);

      })
      .catch(err => console.log('error form spotify' + err));
  }

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
            <TrackListSummary currentPlaylist={currentPlaylist} />
          </Grid.Column>
          <Grid.Column width={10}>
            <List inverted>
              {currentPlaylist.songs &&
                currentPlaylist.songs.map(song => (
                  <TrackList song={song} key={song.song_name + song.duration} />
                ))}
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
  { setCurrentPlaylist }
)(Playlist);
