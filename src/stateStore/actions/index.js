import * as actionTypes from './types';
import formatDataForPlaylist from '../../utility/dataFormatter/formatDataforPlaylist'

// usertype action

export const setUser = user => {
  return {
    type: actionTypes.SET_USER,
    payload: {
      currentUser: user
    }
  };
};

// Playlists action
export const setPlaylists = playlists => {
  return {
    type: actionTypes.SET_PLAYLISTS,
    payload: {
      playlists: playlists
    }
  };
};

export const setCurrentPlaylist = currentPlaylist => {
  const playlist = formatDataForPlaylist(currentPlaylist)
  return {
    type: actionTypes.SET_CURRENT_PLAYLIST,
    payload: {
      currentPlaylist: playlist
    }
  };
};
export const setCurrentSongIndex = (index) => {
  return {
    type: actionTypes.SET_CURRENT_SONG_INDEX,
    payload: {
      currentSongIndex: index
    }
  };
};
export const setCurrentlyPlayingPlaylist = (playlist) => {
  return {
    type: actionTypes.SET_CURRENTLY_PLAYING_PLAYLIST,
  payload:{currentlyPlayingPlaylist:playlist}
  }

}
export const setIsSongPlaying = (isPlaying) => {

  return {
    type: actionTypes.SET_IS_SONG_PLAYING,
  payload:{isPlaying:isPlaying}
  }
}