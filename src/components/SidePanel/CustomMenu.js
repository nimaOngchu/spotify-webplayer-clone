import React, { Component } from 'react';
import { Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import './Sidepanel.css';
export default class CustomMenu extends Component {
  componentDidMount() {
    const navUrl = window.location.href;
    if (navUrl.includes('home')) {
      this.props.makeActive('home');
   }

  }
  handleClick = () => {
    this.props.makeActive(this.props.activeMenuchecker);
    this.props.setCurrentPlaylist &&
      this.props.setCurrentPlaylist(this.props.playlist);
  };
  render() {
    const {
      icon,
      content,
      activeMenu,
      secondaryContent,
      linkTo,
      activeMenuchecker
    } = this.props;

    const activeStyle = {
      background: 'green',
      width: '5px',
      height: icon ? '30px' : '40px',
      marginRight: '20px'
    };

    return (
      <Link to={linkTo} className="sidePanel_navlink">
        <div className="custom_menu" onClick={this.handleClick}>
          {activeMenu === activeMenuchecker ? (
            <span style={activeStyle} />
          ) : (
            <div style={{ height: activeStyle.height, marginRight: '25px' }} />
          )}
          {this.props.icon && (
            <Icon
              name={icon}
              style={{ marginRight: '15px', fontSize: '20px' }}
            />
          )}
          <div className="custom_menu_item">
            {content}
            {secondaryContent && (
              <div style={{ textTransform: 'uppercase', fontWeight: '100' }}>
                {secondaryContent}
              </div>
            )}
          </div>
        </div>
      </Link>
    );
  }
}
