import React, { Component, Fragment } from 'react';
import { Icon, Divider, List, Image, Button } from 'semantic-ui-react';
import CustomMenu from './CustomMenu';
const Custom_Mnu = [
  { content: 'home', icon: 'home', linkTo: '/home' },
  { content: 'search', icon: 'search' },
  { content: 'Your Library', icon: 'book', linkTo: '/playlist' }
];
export class SidePanel extends Component {
  state = { activeMenu: 'home' };

  changeActiveClass = menuName => {
    this.setState({ activeMenu: menuName });
  };

  displayCustomMenu = () => {
    return Custom_Mnu.map(menu => (
      <CustomMenu
        key={menu.content + menu.icon}
        content={menu.content}
        icon={menu.icon}
        activeMenu={this.state.activeMenu}
        click={this.changeActiveClass}
        linkTo={menu.linkTo}
      />
    ));
  };

  render() {
    const { login, user, token } = this.props;

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

export default SidePanel;
