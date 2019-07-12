import React, { Component } from 'react';
import './search.css';
import setSpotifyWebApi from '../../../utility/Spotify';
import Navbar from '../Navbar';

import SearchedSongs from './searchResults/SearchedSongs';
import SearchedPlaylists from './searchResults/SearchedPlaylists';
import { Route, Redirect ,Switch} from 'react-router-dom';
import { connect } from 'react-redux';
import { setCurrentPlaylist } from '../../../stateStore/actions';
import TopResults from './searchResults/TopResults';

export class Search extends Component {
  state = {
    NavItems: null,
    albums: null,
    tracks: null,
    playlists: null,
    artists: null,
    Redirect: false
  };

  handleChange = async e => {
    const query = e.target.value;
    const types = ['album', 'playlist', 'track'];
    if (!query) {
      this.setState({
        NavItems: null
      });
      return;
    }

    try {
      const searchResults = await setSpotifyWebApi.getSpotify.search(
        query,
        types,
        { market: 'NO' }
      );
      this.setNavItems(searchResults);

      this.setState({
        albums: searchResults.albums,
        playlists: searchResults.playlists,
        artists: searchResults.artists
      });
      this.saveSongsToPlaylist(searchResults.tracks);
    } catch (error) {
      if (error.status === 400) {
        console.log('no results found');
      }
    }
    this.setState({ Redirect: true });

  };

  setNavItems = searchResults => {
    let navItems = ['top-results'];
    const checkItems = (checkItem, itemToAddToNav) => {
      if (checkItem.items.length > 0) {
        navItems.push(itemToAddToNav);
      }
    };
    checkItems(searchResults.playlists, 'Playlists');
    checkItems(searchResults.tracks, 'songs');
    checkItems(searchResults.albums, 'albums');
    if (searchResults.tracks.items.length < 1) {
      navItems.shift();
    }

    this.setState({ NavItems: navItems });
  };
  saveSongsToPlaylist = songs => {
    let songList = {
      id: songs.items[0].id,
      name: 'Searched Songs',
      images: [{ url: null }],
      owner: 'searched songs',
      total: songs.total,
      tracks: {
        items: songs.items.map(track => {
          return { track };
        })
      }
    };
    this.props.setCurrentPlaylist(songList);
  };
  handleFocus = e => {
    e.target.value = '';
  };
  render() {
    return (
      <React.Fragment>
        <input
          type="text"
          name="search"
          className="spotify_search_input"
          autoComplete="off"
          defaultValue="Start Typing...."
          onChange={this.handleChange}
          onFocus={this.handleFocus}
        />

        {this.state.NavItems ? (
          <div className="search-content">
            <Navbar NavItems={this.state.NavItems} link={`/search`} />
            <div className="search_route_wrapper">
              <Switch>
              <Route
                path="/search/albums"
                render={props => (
                  <SearchedPlaylists {...props} playlists={this.state.albums} />
                )}
              />

              <Route
                path="/search/playlists"
                render={props => (
                  <SearchedPlaylists
                    {...props}
                    playlists={this.state.playlists}
                  />
                )}
              />
              <Route path="/search/songs" component={SearchedSongs} />
              <Route
                exact
                path="/search/top-results"
                render={props => (
                  <TopResults
                    {...props}
                    playlists={this.state.playlists}
                    albums={this.state.albums}
                  />
                )}
              />
              </Switch>

            </div>
          </div>
        ) : (
          <div className="search-content" style={{ textAlign: 'center' }}>
            <h1>Search Spotify</h1>
            <p>Find your favorite songs, albums, playlists and artists</p>
          </div>
        )}
        {this.state.Redirect && <Redirect to="/search/top-results" />}
      </React.Fragment>
    );
  }
}

export default connect(
  null,
  { setCurrentPlaylist }
)(Search);
