import React, { Component } from 'react';
import { Grid, Segment } from 'semantic-ui-react';
import './App.css';
import SidePanel from './SidePanel/SidePanel';
import { connect } from 'react-redux';
import { setPlaylists , setUser} from '../stateStore/actions';
import setSpotifyWebApi from '../utility/Spotify';
import Home from './mainContent/Home/Home';
import { Route, BrowserRouter } from 'react-router-dom';
import Playlist from './mainContent/Playlist/Playlist';
import TokenKeeper from './TokenKeeper';
import Search from './mainContent/search/Search';
import MusicPlayer from './musicPlayer/MusicPlayer';
import Library from './mainContent/Library/Library';
import PlaylistCollection from './mainContent/PlaylistCollection';

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
    background_color: 'linear-gradient(to bottom, #1a2980, #26d0ce)'
  };

  // changeBackgroundColor = color => {
  //   this.setState({ background_color: color });
  // };

  getUserInfo = () => {
    setSpotifyWebApi.getSpotify.getMe().then(user => {
      this.setState({ user: user });
      this.props.setUser(user);
      this.getUserPlaylist(user.id);
    });
  };
  getUserPlaylist = userId => {
    setSpotifyWebApi.getSpotify.getUserPlaylists(userId).then(playlists => {
      this.props.setPlaylists(playlists.items);
    });
  };

  render() {
    const { currentPlaylist } = this.props;

    return (
      <BrowserRouter>
        <Segment style={{ height: '100vh' }} inverted>
          <Grid
            style={{ height: '87vh', background: 'black' }}
            className="p-r-1">
            <Grid.Column width={3} height="100%">
              <SidePanel user={this.state.user} token={this.state.token} />
            </Grid.Column>
            <Grid.Column
              width={13}
              style={{
                background: 'rgb(17, 16, 16)',
                height: '100%'
              }}
              className="app-maincontent">
              <Route exact path="/" component={Home} />
              <Route path="/home" component ={Home}/>
              <Route path="/tokenHandler" component={TokenKeeper} />
              <Route path='/playlistCollection' component ={PlaylistCollection}
              <Route path="/playlist/:id" component={Playlist} />
              <Route path="/search" component={Search} />
              <Route path="/library" component={Library} />

            </Grid.Column>
          </Grid>
          <MusicPlayer
            playlist={currentPlaylist ? currentPlaylist.songs : null}
          />
        </Segment>
      </BrowserRouter>
    );
  }
}
const mapStateToProps = state => ({
  accessToken: state.getAccessToken.accessToken,
  currentPlaylist: state.playlists.currentlyPlayingPlaylist
});
export default connect(
  mapStateToProps,
  { setPlaylists, setUser }
)(App);
