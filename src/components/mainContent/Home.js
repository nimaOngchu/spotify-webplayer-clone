import React, { Component, Fragment } from 'react';
import Navbar from './Navbar';
import { connect } from 'react-redux';
import { Card, Button } from 'semantic-ui-react';
import Playlist from './Playlist';

export class Home extends Component {
  render() {
    return (
      <Fragment >
        <Navbar />
        <div style ={{display:'flex',padding:'40px', justifyContent:'center'}}>
          <Button children='New Playlist' color='green' style={{borderRadius: '100px'}}/>
        </div>

        {<Card.Group itemsPerRow={6}>
        {this.props.playlists.map(playlist => (
          <Playlist key= {playlist.id} playlist={playlist}/>
        ))}
       </Card.Group>}
      </Fragment>
    );
  }
}
const mapStateToProps = state=>({
  playlists:state.playlists.playlists
  })
export default connect(mapStateToProps,null)(Home);
