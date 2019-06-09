import React, { Component } from 'react';
import { Grid,  Segment } from 'semantic-ui-react';
import './App.css';
import SidePanel from './components/SidePanel/SidePanel';
import Spotify from 'spotify-web-api-js';
import Home from './components/mainContent/Home';
import { connect } from 'react-redux';
import { setPlaylists } from './stateStore/actions';
import ReactMediaVisualizer from 'react-media-visualizer';

const spotify = new Spotify();
class App extends Component {
  state = {
    login: false,
    user: null,
    userLibrary: null,
    playlist: [],
      playlistIsPlaying: false,
      currentSongIndex: 0,
      theme: 'spotify'
  };

  getHashParams = () => {
    var hashParams = {};
    var e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    while ((e = r.exec(q))) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  };

  getUserInfo = () => {
    spotify.getMe().then(user => {

      this.setState({ user: user });
      this.getUserPlaylist(user.id);

    })
  }
  getUserPlaylist = (userId) => {

    spotify.getUserPlaylists(userId)
      .then(playlists =>{
        console.log(playlists)
        this.props.setPlaylists(playlists.items)})

  }

  componentDidMount() {
    let accessToken = this.getHashParams().access_token;
    // let loggedOutAccessToken = this.getHashParams().logged_out_access_token;
    accessToken && this.setState({ login: true });
    spotify.setAccessToken(accessToken);
    this.getUserInfo();
    // this.getUserPlaylist();

  }
  render() {
    return (
      <Segment style= {{height:'100vh'}} inverted>
        <Grid style={{ height: '90vh'}} className ='p-r-1' >
          <Grid.Column
           width={3}>
            <SidePanel login={this.state.login} user = {this.state.user} />
          </Grid.Column>
          <Grid.Column width={13} style ={{background: 'linear-gradient(to bottom, #1a2980, #26d0ce)'}} >
            <Home/>
          </Grid.Column>
        </Grid>

        <ReactMediaVisualizer
                  playlist={this.state.playlist}
          receiveStateUpdates={this.receiveStateUpdates}
          playlistIsPlaying={this.state.playlistIsPlaying}
          theme={this.state.theme}
          currentSongIndex={this.state.currentSongIndex} />

      </Segment>
    );
  }
}
const mapStateToProps = state => {

}
export default connect(null,{setPlaylists})(App);
