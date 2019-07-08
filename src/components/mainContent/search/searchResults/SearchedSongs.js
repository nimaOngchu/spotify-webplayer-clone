import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, List } from 'semantic-ui-react';
import TrackList from '../../../mainContent/Playlist/TrackList';
import {
  setCurrentPlaylist,
  setCurrentlyPlayingPlaylist,
  setCurrentSongIndex,
  setIsSongPlaying
} from '../../../../stateStore/actions';
import setSpotifyWebApi from '../../../../utility/Spotify';
import Song from '../../../../utility/Audio';

function SearchedSongs(props) {
    const {
        setCurrentSongIndex,
        currentPlaylist,
        setCurrentlyPlayingPlaylist,
        currentlyPlayingPlaylist,
        isSongPlaying,
        setIsSongPlaying,
        globalSongIndex
      } = props;

    return (
      currentPlaylist && (
        <List inverted>
          {currentPlaylist.songs &&
            currentPlaylist.songs.map((song, index) => {
              return (
                <TrackList
                  song={song}
                  key={index + song.duration}
                  currentPlaylist={currentPlaylist}
                  globalSongIndex={globalSongIndex}
                  setGlobalSongIndex={setCurrentSongIndex}
                  currentlyPlayingPlaylist={currentlyPlayingPlaylist}
                  setCurrentlyPlayingPlaylist={setCurrentlyPlayingPlaylist}
                  setIsSongPlaying={setIsSongPlaying}
                  isSongPlaying={isSongPlaying}
                />
              );
            })}
        </List>
      )
    );
  }

const mapStateToProps = state => ({
  currentPlaylist: state.playlists.currentPlaylist,
  currentlyPlayingPlaylist: state.playlists.currentlyPlayingPlaylist,
  globalSongIndex: state.playlists.currentSongIndex,
  isSongPlaying: state.playlists.isPlaying
});

export default connect(
  mapStateToProps,
  {
    setCurrentPlaylist,
    setCurrentlyPlayingPlaylist,
    setCurrentSongIndex,
    setIsSongPlaying
  }
)(SearchedSongs);
