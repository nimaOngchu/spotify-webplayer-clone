import React from 'react';
import SearchedSongs from './SearchedSongs';
import SearchedPlaylist from './SearchedPlaylists';
import PlaylistCollection from '../../PlaylistCollection';
import { Grid } from 'semantic-ui-react';
export default function TopResults(props) {
  let styles = {
    height: '580px',
    overflow: 'hidden',
    marginBottom: '20px'
  };

  return (
    <>
      <Grid>
        <Grid.Row style={{ height: '350px', overflow: 'hidden' }}>
          <Grid.Column width={4}>
            {' '}
           {props.playlists.items[0] && <PlaylistCollection
              key={props.playlists.items[0].id}
              playlist={props.playlists.items[0]}
            />}
          </Grid.Column>
          <Grid.Column width={11}>
            <SearchedSongs />
          </Grid.Column>
        </Grid.Row>
        <h1>Albums</h1>
        <Grid.Row style={styles}>
          <SearchedPlaylist playlists={props.albums} />
        </Grid.Row>
        <h1>Playlists</h1>
        <Grid.Row style={styles}>
          <SearchedPlaylist playlists={props.playlists} />
        </Grid.Row>
      </Grid>
    </>
  );
}
