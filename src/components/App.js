import React, { Component } from 'react';
import { Grid, Segment } from 'semantic-ui-react';
import './App.css';
import SidePanel from './SidePanel/SidePanel';
import { connect } from 'react-redux';
import { setPlaylists } from '../stateStore/actions';
import SpotifyWebApi from '../utility/Spotify';
import ReactMediaVisualizer from 'react-media-visualizer';
import Home from './mainContent/Home';
import { Route, BrowserRouter } from 'react-router-dom';
import Test from './mainContent/playlistTracls/playlistTracks';
import TokenKeeper from './TokenKeeper';

class App extends Component {
  state = {
    login: false,
    user: null,
    token: null,
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
    SpotifyWebApi.getMe().then(user => {
      this.setState({ user: user });
      this.getUserPlaylist(user.id);
    });
  };
  getUserPlaylist = userId => {
    SpotifyWebApi.getUserPlaylists(userId).then(playlists => {
      this.props.setPlaylists(playlists.items);
    });
  };

  componentDidMount() {
    let accessToken = localStorage.getItem('accessToken');
    SpotifyWebApi.setAccessToken(accessToken);
     this.setState({token:accessToken})
    this.getUserInfo();
  }

  receiveStateUpdates(payload) {
    if (payload.theme) {
      switch (payload.theme) {
        case 'spotify':
          break;
        case 'youtube':
          break;
        case 'soundcloud':
          break;
        default:
          break;
      }
    }
    this.setState(payload);
  }

  render() {

    return (
      <BrowserRouter>
        <Segment style={{ height: '100vh' }} inverted>
          <Grid style={{ height: '90vh' }} className="p-r-1">
            <Grid.Column width={3}>
              <SidePanel
                login={this.state.login}
                user={this.state.user}
                token={this.state.token}
              />
            </Grid.Column>
            <Grid.Column
              width={13}
              style={{
                background: 'linear-gradient(to bottom, #1a2980, #26d0ce)'
              }}>
              <Route exact path="/" component={Home} />
              <Route path="/home" component={Home} />
              <Route path="/tokenHandler" component={TokenKeeper} />
              <Route path="/playlist" component={Test} />
            </Grid.Column>
          </Grid>
          <ReactMediaVisualizer
            playlist={this.state.playlist}
            playlistIsPlaying={this.state.playlistIsPlaying}
            theme={this.state.theme}
            receiveStateUpdates={this.receiveStateUpdates}
            currentSongIndex={this.state.currentSongIndex}
          />
        </Segment>
      </BrowserRouter>
    );
  }
}
const mapStateToProps = state => ({
  accessToken: state.getAccessToken.accessToken
});
export default connect(
  mapStateToProps,
  { setPlaylists }
)(App);
