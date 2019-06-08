import React, { Component, Fragment } from 'react';
import Navbar from './Navbar';
import UserLibrary from './UserLibrary';
import { connect } from 'react-redux';
import { Card } from 'semantic-ui-react';

export class Home extends Component {
  render() {
    return (
      <Fragment >
        <Navbar />
        <Card.Group itemsPerRow={6}>
        {this.props.playlists.map(playlist => (
          <UserLibrary playlist={playlist}/>
        ))}
       </Card.Group>
      </Fragment>
    );
  }
}
const mapStateToProps = state=>({
  playlists:state.playlists.playlists
  })
export default connect(mapStateToProps,null)(Home);
