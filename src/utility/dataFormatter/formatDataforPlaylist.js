export default function formatDataForPlaylist(data) {
  let songs = [];
  let playlistInfo = null;

  data.tracks.items.map((item, index) => {
    let song = {
      song_name: item.name ? item.name : item.track.name,
      src: item.preview_url ? item.preview_url : item.track.preview_url,
      artists: item.track
        ? item.track.artists.map(artist => artist.name)
        : item.artists.map(artist => artist.name),
      duration: item.duration_ms
        ? item.duration_ms / 60000
        : item.track.duration_ms / 60000,
      albumName: item.track ? item.track.album.name : data.name,
      image: item.track
        ? item.track.album.images.length > 1
          ? item.track.album.images[0].url
          : null
        : data.images.length > 1
        ? data.images[0].url
        : null,
      albumImage: item.track
        ? item.track.album.images.length > 1
          ? item.track.album.images[0].url
          : null
        : data.images.length > 1
        ? data.images[0].url
        : null,
      trackIndex: index
    };
    songs.push(song);
    return songs;
  });

  playlistInfo = {
    id:data.id,
    playlistName: data.name,
    playlistImg: data.images[0].url,
    owner: data.owner ? data.owner.display_name : data.artists[0].name,
    totalSongs: data.tracks.total,
    songs: songs
  };
  return playlistInfo;
}
