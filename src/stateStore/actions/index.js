import * as actionTypes from './types';
import SpotifyWebApi from '../../utility/Spotify';

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
  return {
    type: actionTypes.SET_CURRENT_PLAYLIST,
    payload: {
      currentPlaylist: currentPlaylist
    }
  };
};

// Access token
export const setAccessToken = accessToken => {
  SpotifyWebApi.setAccessToken(accessToken);
    return {
        type: actionTypes.SET_ACCESS_TOKEN,
        payload:{ accessToken:accessToken}
    }
}
