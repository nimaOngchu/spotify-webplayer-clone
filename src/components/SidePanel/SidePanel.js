import React, { Component, Fragment } from 'react';
import { Icon, Divider, List, Image, Button } from 'semantic-ui-react';
import CustomMenu from './CustomMenu';
import {spotifyApi} from 'spotify-web-api-js'
const Custom_Mnu = [
  { content: 'home', icon: 'home' },
  { content: 'search', icon: 'search' },
  { content: 'Your Library', icon: 'book' }
];
export class SidePanel extends Component {
    //  spotifyApi = new SpotifyWebApi();
  state = { activeMenu: 'home' };
  changeActiveClass = menuName => {
    this.setState({ activeMenu: menuName });
    // console.log(this.state.activeMenu);
  };
  displayCustomMenu = () => {
    return Custom_Mnu.map(menu => (
        <CustomMenu
            key = {menu.content +menu.icon}
        content={menu.content}
        icon={menu.icon}
        activeMenu={this.state.activeMenu}
        click={this.changeActiveClass}
      />
    ));
  };
    render() {

    return (
      <Fragment>
        <div style={{ fontSize: '30px', margin: 15, color: 'white' }}>
          <Icon name="spotify" />
          <span>Spotify</span>
        </div>
        {this.displayCustomMenu()}
        <Divider />
        <span style={{ marginLeft: 15 }}>RECENTLY PLAYED</span>
        <CustomMenu
          content="Daily Mix"
          activeMenu={this.state.activeMenu}
          click={this.changeActiveClass}
          secondaryContent="playlist"
        />
        <CustomMenu
          content="nima"
          activeMenu={this.state.activeMenu}
          click={this.changeActiveClass}
          secondaryContent="Playlist"
        />
        <div className={'sidepanelFooter'}>
                <Divider />
                {this.props.login ?

                    <List selection verticalAlign="middle">
            <List.Item>
              <Image
                avatar
                src="https://react.semantic-ui.com/images/avatar/small/christian.jpg"
              />
              <List.Content>
                <List.Header style={{ color: 'white' }}>
                  Nima ongchu sherpa
                </List.Header>
              </List.Content>
            </List.Item>
          </List>:  <Button inverted fluid onClick={() => window.location = 'http://localhost:8888/login'}>Login</Button>
                    }
        </div>
      </Fragment>
    );
  }
}

export default SidePanel;
