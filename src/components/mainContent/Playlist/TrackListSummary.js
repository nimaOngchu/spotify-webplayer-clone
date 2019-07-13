import React from 'react';
import { Card, Image, Button } from 'semantic-ui-react';

export default function TrackListSummary({
  song,
  setGlobalSongIndex,
  currentPlaylist,
  setCurrentlyPlayingPlaylist,
  currentlyPlayingPlaylist,
  // isSongPlaying,
  setIsSongPlaying
}) {
  const checkForPlayOrPause = () => {
    if (currentlyPlayingPlaylist) {
      if (currentlyPlayingPlaylist.id === currentPlaylist.id) {
        if (song.paused) {
          return 'play';
        } else {
          return 'pause';
        }
      } else {
        return 'play';
      }
    } else {
      return 'play';
    }
  };
  const handlePlayPause = () => {
    if (currentlyPlayingPlaylist) {
      if (currentPlaylist.id !== currentlyPlayingPlaylist.id) {
        setCurrentlyPlayingPlaylist(currentPlaylist);
        setGlobalSongIndex(0);
        setIsSongPlaying(true);
        song.src = currentPlaylist.songs[0].src;
        song.play();
      } else {
        if (song.paused) {
          song.play();
          setIsSongPlaying(true);

        } else {
          song.pause();
          setIsSongPlaying(false);

        }
      }
    } else {
      setCurrentlyPlayingPlaylist(currentPlaylist);
      setGlobalSongIndex(0);
      song.src = currentPlaylist.songs[0].src;
      song.play();
      setIsSongPlaying(true);
    }
  };

  return (
    <Card className="whiteText">
      <Image src={currentPlaylist.playlistImg} size="medium" />
      <Card.Content>
        <Card.Header
          className="whiteText"
          style={{ fontSize: '28px', textTransform: 'capitalize' }}>
          {currentPlaylist.playlistName}
        </Card.Header>
        <Card.Meta>
          <span className="date whiteText"> {currentPlaylist.owner}</span>
        </Card.Meta>
      </Card.Content>
      <div>
        <Button
          color="green"
          size="large"
          style={{ borderRadius: '100px' }}
          onClick={handlePlayPause}>
          {checkForPlayOrPause()}
        </Button>
      </div>

      <Card.Content extra className="whiteText" >
        {currentPlaylist.totalSongs} Songs
      </Card.Content>
    </Card>
  );
}
