import React from 'react';
import { Card, Image, Button } from 'semantic-ui-react';

export default function TrackListSummary({ currentPlaylist }) {
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
        <Button color="green" size="large" style={{ borderRadius: '100px' }}>
          Play
        </Button>
      </div>

      <Card.Content extra className="whiteText">
        {currentPlaylist.totalSongs} Songs
      </Card.Content>
    </Card>
  );
}
