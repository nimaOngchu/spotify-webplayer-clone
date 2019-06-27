import React, { Component, Fragment } from 'react';
import { Icon, Divider, List, Image, Button } from 'semantic-ui-react';
import CustomMenu from './CustomMenu';
import setSpotifyWebApi from '../../utility/Spotify';
import { setCurrentPlaylist } from '../../stateStore/actions';
import { connect } from 'react-redux';
import { CLIENT_RENEG_LIMIT } from 'tls';
const Custom_Mnu = [
  { content: 'home', icon: 'home', linkTo: '/home' },
  { content: 'search', icon: 'search', linkTo: '/search' },
  { content: 'Your Library', icon: 'book', linkTo: '/home' }
];
export class SidePanel extends Component {
  state = {
    activeMenu: 'home',
    recentlyPlayedPlaylist: null
  };

  changeActiveClass = menuName => {
    this.setState({ activeMenu: menuName });
  };
  componentDidMount() {
    this.recentlyPlayed();
  }

  recentlyPlayed = () => {
    //getting the recently played tracks
    setSpotifyWebApi.getSpotify.getMyRecentlyPlayedTracks().then(tracks => {
      let playlist = [];
      //retrieving playlist id from the recent tracks
           tracks.items.map(item => {
        if (item.context.uri.includes('playlist')) {
          let newString = item.context.uri;
          playlist.push(newString.substr(17, newString.length));
        }

        return null;
      });
      let playlistIds = [...new Set(playlist)]; //filtering duplicate values
      //getting playlist from the playlist ids
      this.getPlaylistData(playlistIds);
    });
  };

  getPlaylistData = async playlistIds => {
    const promises = playlistIds.map(setSpotifyWebApi.getSpotify.getPlaylist);
    const recentlyPlayedPlaylist = await Promise.all(promises);
    this.setState({ recentlyPlayedPlaylist });

  };

  displayCustomMenu = () => {
    return Custom_Mnu.map(menu => (
      <CustomMenu
        key={menu.content + menu.icon}
        content={menu.content}
        icon={menu.icon}
        activeMenu={this.state.activeMenu}
        makeActive={this.changeActiveClass}
        linkTo={menu.linkTo}
      />
    ));
  };

  render() {
    const { user, token } = this.props;

    return (
      <Fragment>
        <div style={{ fontSize: '30px', margin: 15, color: 'white' }}>
          <Icon name="spotify" />
          <span>Spotify</span>
        </div>
        {this.displayCustomMenu()}
        <Divider />
        <span style={{ marginLeft: 15 }}>RECENTLY PLAYED</span>

        {this.state.recentlyPlayedPlaylist &&
          this.state.recentlyPlayedPlaylist.map(playlist => {
                const linkTo =
              window.location.href.includes('/playlist')
                ? playlist.id
                : `playlist/${playlist.id}`;
            return (
              <CustomMenu
                content={playlist.name}
                activeMenu={this.state.activeMenu}
                makeActive={this.changeActiveClass}
                secondaryContent="playlist"
                linkTo={linkTo}
                playlist={playlist}
                setCurrentPlaylist ={this.props.setCurrentPlaylist}
              />
            );
          })}

        <div className={'sidepanelFooter'}>
          <Divider />
          {token === null ? (
            <Button
              inverted
              fluid
              onClick={() => (window.location = 'http://localhost:8888/login')}>
              Login
            </Button>
          ) : (
            <List selection verticalAlign="middle">
              <List.Item>
                <Image avatar src={user && user.images[0].url} />
                <List.Content>
                  <List.Header style={{ color: 'white' }}>
                    {user && user.display_name}
                  </List.Header>
                </List.Content>
              </List.Item>
            </List>
          )}
        </div>
      </Fragment>
    );
  }
}

export default connect(null, {setCurrentPlaylist})(SidePanel);
