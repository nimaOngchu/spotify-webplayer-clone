import React, { Component } from 'react';
import { List, Icon, Grid, Dimmer,  ListItem } from 'semantic-ui-react';

export default class TrackList extends Component {
  state = { dimmerActive: true };
  render() {
    const { song } = this.props;
    return (
      <div>
        <Dimmer.Dimmable as={ListItem} dimmed={this.state.dimmerActive}>
          <List.Item>
            <Grid>
              <Grid.Column
                style={{ display: 'flex', alignItems: 'center' }}
                width={15}>
                <Icon name="music" />
                <List.Content>
                  <List.Header>{song.song_name}</List.Header>
                  <List.Description>
                    <a>{song.artists.map(artist => artist + ', ')}</a>{' '}
                    <span style={{ padding: '3px' }}>-</span>
                    <a>{song.albumName}</a>
                  </List.Description>
                </List.Content>
              </Grid.Column>
              <Grid.Column width={1}>
                <span>{Math.round(song.duration * 100) / 100}</span>
              </Grid.Column>
            </Grid>
          </List.Item>
        </Dimmer.Dimmable>
      </div>
    );
  }
}
