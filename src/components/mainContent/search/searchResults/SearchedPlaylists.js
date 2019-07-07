import React from 'react';
import { Card } from 'semantic-ui-react';
import PlaylistCollection from '../../PlaylistCollection';

export default function SearchedPlaylists(props) {

    return (
        <div >
            <Card.Group itemsPerRow={6}>
          {props.playlists.items.map(playlist => (
            <PlaylistCollection key={playlist.id} playlist={playlist} />
          ))}
        </Card.Group>
        </div>
    )
}
