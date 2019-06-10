import React, { Component } from 'react';
import './playlistTracks.css';
import { connect } from 'react-redux';
import { Grid, Image, Button, List, Divider } from 'semantic-ui-react';
import TrackList from './TrackList';

export class Test extends Component {
  state = {
    currentPlaylist: null,
    dimmer: true
  };

  handleShowDimmer = () => this.setState({ dimmer: true });
  handleHideDimmer = () => this.setState({ dimmer: false });
  render() {
    const { currentPlaylist } = this.props;
    console.log(currentPlaylist.songs);
    const containerStyle = {
      padding: '2rem',
      height: '100%'
    };
    return (
      currentPlaylist && (
        <Grid style={{ containerStyle }} className="playlistContainer">
          <Grid.Column width={5} textAlign="center">
            <Image src={currentPlaylist.playlistImg} size="medium" />
            <h2>{currentPlaylist.playlistName}</h2>
            <span style={{ display: 'block', paddingBottom: '15px' }}>
              {currentPlaylist.owner}
            </span>
            <Button
              color="green"
              size="large"
              style={{ borderRadius: '100px' }}>
              Play
            </Button>
            <div>{currentPlaylist.totalSongs} Songs</div>
          </Grid.Column>

          <Grid.Column width={10}>
            <List inverted>
              {currentPlaylist.songs &&
                currentPlaylist.songs.map(song => (
                  <TrackList
                    active={this.state.dimmer}
                    handleShowDimmer={this.handleShowDimmer}
                    handleHideDimmer={this.handleHideDimmer}
                    song={song}
                  />
                ))}
            </List>
          </Grid.Column>
        </Grid>
      )
    );
  }
}
const mapStateToProps = state => ({
  currentPlaylist: state.playlists.currentPlaylist
});
export default connect(
  mapStateToProps,
  null
)(Test);
