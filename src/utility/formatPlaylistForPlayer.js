import React from 'react';
import SpotifyWebApi from './Spotify';

const formatPlaylistForPlayer = playlistId => {

  return SpotifyWebApi.getPlaylist(playlistId).then(playlist => {
    let songs = [];
    playlist.tracks.items.map(item => {
      let song = {
        song_name: item.track.name,
        src: item.track.preview_url,
        artists: item.track.artists.map(artist => artist.name),
        duration: item.track.duration_ms / 60000,
        albumName: item.track.album.name,
        albumImage: item.track.album.images[0].url
      };
      songs.push(song);
    });

    let playlistInfo = {
      playlistName: playlist.name,
      playlistImg: playlist.images[0].url,
      owner: playlist.owner.display_name,
      totalSongs: playlist.tracks.total,
      songs: songs
    };

    return playlistInfo;
  });
};
export default formatPlaylistForPlayer;
