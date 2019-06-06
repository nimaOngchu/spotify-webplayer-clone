import React, { Component } from 'react';
import { Icon } from 'semantic-ui-react';
export default class CustomMenu extends Component {
  render() {
    const { icon, content, activeMenu, secondaryContent } = this.props;

    const activeStyle = {
      background: 'green',
      width: '5px',
      height: icon ? '30px' : '40px',
      marginRight: '10px'
    };

    return (
      <div
        className={
          activeMenu === content ? 'custom_menu whiteText' : 'custom_menu'
        }
        onClick={() => this.props.click(this.props.content)}>
        {activeMenu === content ? (
          <span style={activeStyle} />
        ) : (
          <div style={{ height: activeStyle.height, marginRight: '15px' }} />
        )}
        {this.props.icon && <Icon name={icon} />}
        <div className="custom_menu_item">
          {content}
          {secondaryContent && <div style={{textTransform:'uppercase'}}>{secondaryContent}</div>}
        </div>
      </div>
    );
  }
}
