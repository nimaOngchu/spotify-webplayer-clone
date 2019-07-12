import React from 'react';
import { Card } from 'semantic-ui-react';
import PlaylistCollection from '../PlaylistCollection';

export default function Featured({ playlists }) {

       return(
            <Card.Group itemsPerRow={6}>
            {
                playlists && playlists.map(playlist => (
                <PlaylistCollection key={playlist.id} playlist={playlist} />
              ))}
          </Card.Group>)

}
