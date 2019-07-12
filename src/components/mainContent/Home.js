import React, { Component, Fragment } from 'react';
import Navbar from './Navbar';
import { connect } from 'react-redux';
import { Card, Button } from 'semantic-ui-react';
import PlaylistCollection from './PlaylistCollection';
import './Home.css';
const NavItems = [
   'featured' ,

   'generes ' ,
   'new releases' ,
   'discover'
];
export class Home extends Component {
  render() {
    return (
      <div className="home-wrapper">
        <Navbar NavItems={NavItems} link="/home"/>
        <div className="button-wrapper">
          <Button
            children="New Playlist"
            color="green"
            style={{ borderRadius: '100px' }}
          />
        </div>
        <Card.Group itemsPerRow={6}>
          {this.props.playlists.map(playlist => (
            <PlaylistCollection key={playlist.id} playlist={playlist} />
          ))}
        </Card.Group>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  playlists: state.playlists.playlists
});
export default connect(
  mapStateToProps,
  null
)(Home);
