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
  let songs = [];

  currentPlaylist.tracks.items.map(item => {
        let song = {
          song_name: item.track.name,
          src: item.track.preview_url,
          artists: item.track.artists.map(artist => artist.name),
          duration: item.track.duration_ms / 60000,
          albumName: item.track.album.name,
          image:item.track.album.images[0].url,
          albumImage: item.track.album.images[0].url
        };
        songs.push(song);
        return songs
      });

      let playlistInfo = {
        playlistName: currentPlaylist.name,
        playlistImg: currentPlaylist.images[0].url,
        owner: currentPlaylist.owner.display_name,
        totalSongs: currentPlaylist.tracks.total,
        songs:songs
  };

  return {
    type: actionTypes.SET_CURRENT_PLAYLIST,
    payload: {
      currentPlaylist: playlistInfo
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
