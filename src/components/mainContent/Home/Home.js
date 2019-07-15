import React, { Component } from 'react';
import Navbar from '../Navbar';
import { Route, Redirect, Switch } from 'react-router-dom';
import setSpotifyWebApi from '../../../utility/Spotify';
import './Home.css';
import Featured from './Featured';
import Generes from './Generes';
import NewRelease from './NewRelease';
const NavItems = ['featured', 'generes', 'new-releases', 'discover'];
export class Home extends Component {
  state = {
    featuredPlaylists: null,
    newReleases: null,
    listOfGeneres:null};
  componentDidMount() {
    this.makeCallToSpotify()

  }
  makeCallToSpotify = async () => {
    let promises = [setSpotifyWebApi()
      .getFeaturedPlaylists({country:'US'}), setSpotifyWebApi().getNewReleases({country:'US'}), setSpotifyWebApi().getCategories({country:'US'})]
    const response = await Promise.all(promises);

    this.setState({
      featuredPlaylists: response[0].playlists.items,
      newReleases: response[1].albums.items,
      listOfGeneres: response[2].categories.items
    })

  }
  render() {

    return (
      <div className="home-wrapper">
        <Navbar NavItems={NavItems} link="/home" />
        <section style={{ marginTop: '3rem' }}>
          <Switch>
            <Redirect exact from='/' to='/home/featured' />
            <Redirect exact from="/home" to="/home/featured" />
            <Route
              path="/home/featured"
              render={props => (
                <Featured {...props} playlists={this.state.featuredPlaylists} />
              )}
            />
            <Route
              path="/home/generes"
              render={props => (
                <Generes {...props} listOfGeneres={this.state.listOfGeneres} />
              )}
            />
            <Route path="/home/new-releases"
            render={props => (
                <NewRelease {...props} newReleases={this.state.newReleases} />
              )}/>
          </Switch>

        </section>
      </div>
    );
  }
}

export default Home;
