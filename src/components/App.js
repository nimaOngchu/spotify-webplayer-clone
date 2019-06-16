import React, { Component } from 'react';
import { Grid, Segment } from 'semantic-ui-react';
import './App.css';
import SidePanel from './SidePanel/SidePanel';
import { connect } from 'react-redux';
import { setPlaylists, setCurrentPlaylist } from '../stateStore/actions';
import SpotifyWebApi from '../utility/Spotify';
import Home from './mainContent/Home';
import { Route, BrowserRouter } from 'react-router-dom';
import Playlist from './mainContent/playlistTracls/Playlist';
import TokenKeeper from './TokenKeeper';
import Search from './mainContent/search/Search';
import MusicPlayer from './musicPlayer/MusicPlayer';
import songs from '../songs'
import { type } from 'os';

class App extends Component {
  state = {
    login: false,
    user: null,
    token: null,
    userLibrary: null,
    currentPlaylists:songs,

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
    SpotifyWebApi.getMe().then(user => {
      this.setState({ user: user });
      this.getUserPlaylist(user.id);
    });
  };
  getUserPlaylist = userId => {
    SpotifyWebApi.getUserPlaylists(userId).then(playlists => {
      this.props.setPlaylists(playlists.items);
        SpotifyWebApi.getPlaylist(playlists.items[0].id).then(playlist => {
    this.props.setCurrentPlaylist(playlist);
    });
    });
  };

  componentWillMount() {
    let accessToken = localStorage.getItem('accessToken');
    SpotifyWebApi.setAccessToken(accessToken);
    this.setState({ token: accessToken });
    this.getUserInfo();

  }

  render() {
    const { currentPlaylist } = this.props;
    let songs = currentPlaylist.songs;

    return (
      <BrowserRouter>
        <Segment style={{ height: '100vh' }} inverted>
          <Grid style={{ height: '87vh' }} className="p-r-1">
            <Grid.Column width={3} height="100%">
              <SidePanel
                login={this.state.login}
                user={this.state.user}
                token={this.state.token}
              />
            </Grid.Column>
            <Grid.Column
              width={13}
              style={{
                background: 'linear-gradient(to bottom, #1a2980, #26d0ce)',
                height: '100%', overflow:'scroll'
              }}>
              <Route exact path="/" component={Home} />
              <Route path="/home" component={Home} />
              <Route path="/tokenHandler" component={TokenKeeper} />
              <Route path="/playlist" component={Playlist} />
              <Route path="/search" component={Search} />
            </Grid.Column>
          </Grid>
          {currentPlaylist.songs&&<MusicPlayer playlist={ currentPlaylist.songs} />}
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
