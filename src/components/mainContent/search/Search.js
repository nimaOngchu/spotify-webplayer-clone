import React, { Component } from 'react';
import './search.css';
import setSpotifyWebApi from '../../../utility/Spotify';
import Navbar from '../Navbar';
import Searched_albums from './searchResults/Searched_albums';
import Searched_artists from './searchResults/Searched_artists';
import SearchedSongs from './searchResults/SearchedSongs';
import SearchedPlaylists from './searchResults/SearchedPlaylists';
import { Route } from 'react-router-dom';

export class Search extends Component {
  state = {
    NavItems: null,
    albums: null,
    tracks: null,
    playlists: null,
    artists: null
  };
  componentDidMount() {}
  handleChange = async e => {
    const query = e.target.value;
    const types = ['album', 'artist', 'playlist', 'track'];
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
        tracks: searchResults.tracks,
        playlists: searchResults.playlists,
        artists: searchResults.artists
      });
    } catch (error) {
      if (error.status === 400) {
        console.log('no results found');
      }
    }
  };

  setNavItems = searchResults => {

    let navItems = ['Top Results'];
    const checkItems = (checkItem, itemToAddToNav) => {
      if (checkItem.items.length > 0) {
        navItems.push(itemToAddToNav);
      }
    };
    checkItems(searchResults.artists, 'artists');
    checkItems(searchResults.tracks, 'songs');
    checkItems(searchResults.playlists, 'Playlists');
    checkItems(searchResults.albums, 'albums');
    if (searchResults.tracks.items.length < 1) {
      navItems.shift();
    }

    this.setState({ NavItems: navItems });
  };
  handleFocus = e => {
    e.target.value = '';
  };
  render() {

    return (
      <div>
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
              <Route path="/search/albums"
                render={props => (
                  <SearchedPlaylists
                    {...props}
                    playlists={this.state.albums}
                  />
                )}
              />
              <Route path="/search/artists" component={Searched_artists} />
              <Route
                path="/search/playlists"
                render={props => (
                  <SearchedPlaylists
                    {...props}
                    playlists={this.state.playlists}
                  />
                )}
              />
              <Route
                path="/search/songs"
                render={props => (
                  <SearchedSongs {...props} songs={this.state.tracks} />
                )}
              />
              {/* <Route path="/search/top-songs" component={Searched_top_songs} /> */}
            </div>
          </div>
        ) : (
          <div className="search-content" style={{ textAlign: 'center' }}>
            <h1>Search Spotify</h1>
            <p>Find your favorite songs, albums, playlists and artists</p>
          </div>
        )}
      </div>
    );
  }
}

export default Search;
