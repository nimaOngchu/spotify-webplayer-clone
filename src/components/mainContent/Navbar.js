import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';

const NAV_MENU_ITEMS = [
  { name: 'FEATURED' },
  { name: 'PODCAST' },
  { name: 'CHARTS' },
  { name: 'GENERES' },
  { name: 'NEW REALESES' },
  { name: 'DISCOVER' }
];

export default class Navbar extends Component {
  state = { activeItem: NAV_MENU_ITEMS[0].name };
  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
  };
  render() {
    const { activeItem } = this.state;
    return (
      <Menu secondary inverted pointing>
        {NAV_MENU_ITEMS.map(menu => (
          <Menu.Item
            name={menu.name}
            active={activeItem === menu.name}
            onClick={this.handleItemClick}
          />
        ))}
      </Menu>
    );
  }
}
