import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = { activeItem: this.props.NavItems[0] };
  }

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
  };
  render() {
    const { activeItem } = this.state;
    return (
      <Menu secondary inverted pointing>
        {this.props.NavItems.map(menu => (
          <Link to={this.props.link+ '/'+menu} key={menu}>
          <Menu.Item

            name={menu}
            active={activeItem === menu}
            onClick={this.handleItemClick}
            style ={{textTransform:'uppercase'}}
          />
          </Link>
        ))}
      </Menu>
    );
  }
}
