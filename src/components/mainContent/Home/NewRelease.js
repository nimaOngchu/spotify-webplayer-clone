import React from 'react';
import { Card } from 'semantic-ui-react';
import PlaylistCollection from '../PlaylistCollection';

export default function NewRelease({newReleases}) {
    return (
        <Card.Group itemsPerRow={6}>
        {
            newReleases && newReleases.map(playlist => (
            <PlaylistCollection key={playlist.id} playlist={playlist} />
          ))}
      </Card.Group>)
    
}
