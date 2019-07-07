import React, { Component } from 'react';
import './playlistTracks.css';
import { connect } from 'react-redux';
import { Grid, List } from 'semantic-ui-react';
import TrackList from './TrackList';
import TrackListSummary from './TrackListSummary';
import { setCurrentPlaylist, setCurrentlyPlayingPlaylist, setCurrentSongIndex,setIsSongPlaying } from '../../../stateStore/actions';
import setSpotifyWebApi from '../../../utility/Spotify';
import Song from '../../../utility/Audio';
export class Playlist extends Component {
  state ={
    localSongIndex: null,
    playPauseText:'play'
  }

  componentDidMount() {
    const id = this.props.match.params.id;
     setSpotifyWebApi.getSpotify
      .getPlaylist(id)
      .then(playlist => {
        this.props.setCurrentPlaylist(playlist);

      })
      .catch(err => console.log('error form spotify' + err));

  }
  changeLocalSongIndex = (index) => {
    this.setState({ localSongIndex:index})
  }

  handlePlayPauseText = (text) => {this.setState({playPauseText:text}) }
  render() {
    const {
      setCurrentSongIndex,
      currentPlaylist,
      setCurrentlyPlayingPlaylist,
      currentlyPlayingPlaylist,
      isSongPlaying,
      setIsSongPlaying,
      globalSongIndex
    } = this.props;

    const containerStyle = {
      padding: '2rem',
      height: '100%'
    };

    return (

      currentPlaylist && (
        <Grid style={{ containerStyle }} className="playlistContainer">
          <Grid.Column width={5} textAlign="center" style={{ paddingLeft: 60 }}>
            <TrackListSummary
              currentPlaylist={currentPlaylist}
              setCurrentlyPlayingPlaylist={setCurrentlyPlayingPlaylist}
              currentlyPlayingPlaylist ={ currentlyPlayingPlaylist}
              song={Song}
              // isSongPlaying={isSongPlaying}
              setGlobalSongIndex={setCurrentSongIndex}
              playPauseText={this.state.playPauseText}
              changePlayPauseText={this.handlePlayPauseText}
              setIsSongPlaying={setIsSongPlaying}
            />
          </Grid.Column>
          <Grid.Column width={10}>
            <List inverted>
              {currentPlaylist.songs &&
                currentPlaylist.songs.map(song => (
                  <TrackList
                    song={song}
                    key={song.song_name + song.duration}
                    currentPlaylist={currentPlaylist}
                    localSongIndex={this.state.localSongIndex}
                    changeLocalSongIndex={this.changeLocalSongIndex}
                    globalSongIndex={globalSongIndex}
                    setGlobalSongIndex={setCurrentSongIndex}
                    currentlyPlayingPlaylist={currentlyPlayingPlaylist}
                    setCurrentlyPlayingPlaylist={setCurrentlyPlayingPlaylist}
                    setIsSongPlaying={setIsSongPlaying}

                  />
                ))}
            </List>
          </Grid.Column>
        </Grid>
      )
    );
  }
}
const mapStateToProps = state => ({
  currentPlaylist: state.playlists.currentPlaylist,
  currentlyPlayingPlaylist:state.playlists.currentlyPlayingPlaylist,
  globalSongIndex: state.playlists.currentSongIndex,
  isSongPlaying: state.playlists.isPlaying
});

export default connect(
  mapStateToProps,
  { setCurrentPlaylist, setCurrentlyPlayingPlaylist, setCurrentSongIndex, setIsSongPlaying }
)(Playlist);
