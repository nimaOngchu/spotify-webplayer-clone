import React, { Component } from 'react';
import { Grid, Segment } from 'semantic-ui-react';
import './App.css';
import SidePanel from './SidePanel/SidePanel';
import { connect } from 'react-redux';
import { setPlaylists, setCurrentPlaylist } from '../stateStore/actions';
import setSpotifyWebApi from '../utility/Spotify';
import Home from './mainContent/Home';
import { Route, BrowserRouter } from 'react-router-dom';
import Playlist from './mainContent/Playlist/Playlist';
import TokenKeeper from './TokenKeeper';
import Search from './mainContent/search/Search';
import MusicPlayer from './musicPlayer/MusicPlayer';
import songs from '../songs';

class App extends Component {

  componentDidMount() {
    let accessToken = localStorage.getItem('accessToken');
    // setSpotifyWebApi.getSpotify.setAccessToken(accessToken);
    this.setState({ token: accessToken });
    this.getUserInfo();
  }
  state = {
    user: null,
    token: null,
    userLibrary: null,
    currentPlaylists: songs
  };

  // getHashParams = () => {
  //   var hashParams = {};
  //   var e,
  //     r = /([^&;=]+)=?([^&;]*)/g,
  //     q = window.location.hash.substring(1);
  //   while ((e = r.exec(q))) {
  //     hashParams[e[1]] = decodeURIComponent(e[2]);
  //   }
  //   return hashParams;
  // };

  getUserInfo = () => {
    setSpotifyWebApi.getSpotify.getMe().then(user => {
      this.setState({ user: user });
      this.getUserPlaylist(user.id);
    });
  };
  getUserPlaylist = userId => {
    setSpotifyWebApi.getSpotify.getUserPlaylists(userId).then(playlists => {
      this.props.setPlaylists(playlists.items);
      setSpotifyWebApi.getSpotify.getPlaylist(playlists.items[0].id).then(playlist => {
        // this.props.setCurrentPlaylist(playlist);
      });
    });
  };

  render() {
    const { currentPlaylist } = this.props;

    return (
      <BrowserRouter>
        <Segment style={{ height: '100vh' }} inverted>
          <Grid style={{ height: '87vh' }} className="p-r-1">
            <Grid.Column width={3} height="100%">
              <SidePanel user={this.state.user} token={this.state.token} />
            </Grid.Column>
            <Grid.Column
              width={13}
              style={{
                background: 'linear-gradient(to bottom, #1a2980, #26d0ce)',
                height: '100%',
                overflow: 'scroll'
              }}>
              <Route exact path="/" component={Home} />
              <Route path="/home" component={Home} />
              <Route path="/tokenHandler" component={TokenKeeper} />
              <Route path="/playlist/:id" component={Playlist} />
              <Route path="/search" component={Search} />
            </Grid.Column>
          </Grid>
          <MusicPlayer
            playlist={currentPlaylist.songs ? currentPlaylist.songs : null}
          />
        </Segment>
      </BrowserRouter>
    );
  }
}
const mapStateToProps = state => ({
  accessToken: state.getAccessToken.accessToken,
  currentPlaylist: state.playlists.currentPlaylist
});
export default connect(
  mapStateToProps,
  { setPlaylists, setCurrentPlaylist }
)(App);
