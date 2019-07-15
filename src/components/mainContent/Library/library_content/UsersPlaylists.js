import React, { Component } from 'react';
import setSpotifyWebApi from '../../../../utility/Spotify';
import { connect } from 'react-redux';
import { Card } from 'semantic-ui-react';
import PlaylistCollection from '../../PlaylistCollection';
class UsersPlaylists extends Component {
  state = { playlists: null };
  componentDidMount() {
    this.props.user &&
      setSpotifyWebApi()
        .getUserPlaylists(this.props.user.id)
        .then(playlists => {
          this.setState({ playlists: playlists.items });
        });
  }
  render() {

    return (
      <div>
        {this.state.playlists && (
          this.state.playlists.length>0?
          <Card.Group itemsPerRow={6}>
            {this.state.playlists.map(playlist => (
              <PlaylistCollection key={playlist.id} playlist={playlist} />
            ))}
            </Card.Group> :
            <div style={{textAlign:'center', marginTop:'4rem',fontSize:'3rem'}}>
              You do nont have any playlists yet
            </div>
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
