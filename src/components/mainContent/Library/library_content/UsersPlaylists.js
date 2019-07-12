import React, { Component } from 'react';
import setSpotifyWebApi from '../../../../utility/Spotify';
import { connect } from 'react-redux';
import { Card } from 'semantic-ui-react';
import PlaylistCollection from '../../PlaylistCollection';
class UsersPlaylists extends Component {
  state = { playlists: null };
  componentDidMount() {
    this.props.user &&
      setSpotifyWebApi.getSpotify
        .getUserPlaylists(this.props.user.id)
        .then(playlists => {
          this.setState({ playlists: playlists.items });
        });
  }
  render() {
    return (
      <div>
        {this.state.playlists && (
          <Card.Group itemsPerRow={6}>
            {this.state.playlists.map(playlist => (
              <PlaylistCollection key={playlist.id} playlist={playlist} />
            ))}
          </Card.Group>
        )}
      </div>
    );
  }
}
const mapStateToprops = state => ({ user: state.user.currentUser });
export default connect(
  mapStateToprops,
  null
)(UsersPlaylists);
