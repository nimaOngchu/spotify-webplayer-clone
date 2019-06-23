import React, { Component } from 'react';
import { List, Icon, Grid } from 'semantic-ui-react';

export default class TrackList extends Component {
  state = { iconName: 'music' };
  formatArtists = artists => {
    let foramtedArtist = '';
    artists.map(artist => {
      foramtedArtist = foramtedArtist.concat(artist + ', ');
    });
    return foramtedArtist.slice(0, -2);
  };
  onSelect = () => {
    this.setState({ iconName: 'play' });
  };
  onTrackleacve = () => {
    this.setState({ iconName: 'music' });
  };
  render() {
    const { song } = this.props;
    return (
      <div
        className="trackList-overlay"
        onMouseEnter={this.onSelect}
        onMouseLeave={this.onTrackleacve}>
        <List.Item>
          <Grid>
            <Grid.Column
              style={{ display: 'flex', alignItems: 'center' }}
              width={14}>
              <Icon
                name={this.state.iconName}
                style={{ marginRight: '.5rem' }}
              />
              <List.Content>
                <List.Header>{song.song_name}</List.Header>
                <List.Description>
                  <a>{this.formatArtists(song.artists)}</a>{' '}
                  <span style={{ padding: '3px', fontStyle: 'bolder' }}>-</span>
                  <a style={{ fontStyle: 'italic' }}>{song.albumName}</a>
                </List.Description>
              </List.Content>
            </Grid.Column>
            <Grid.Column width={2}>
              <span>{Math.round(song.duration * 100) / 100}</span>
            </Grid.Column>
          </Grid>
        </List.Item>
      </div>
    );
  }
}
