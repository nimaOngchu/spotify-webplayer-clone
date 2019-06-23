import React, { Component } from 'react';
import { Card, Icon, Image, Dimmer } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { setCurrentPlaylist } from '../../stateStore/actions';
import SpotifyWebApi from '../../utility/Spotify';
import { Redirect } from 'react-router-dom';

class PlaylistCollection extends Component {
  state = {

    redirect: false
  };

  handleShow = () => this.setState({ active: true });
  handleHide = () => this.setState({ active: false });
  setActivePlaylist = () => {

    SpotifyWebApi.getPlaylist(this.props.playlist.id).then(playlist => {
    this.props.setCurrentPlaylist(playlist);
    });

  };
  onPlayPauseClick = () => {
    this.state.icon_name === 'play circle outline' &&
    this.state.icon_name === 'play circle outline'
      ? this.setState({ icon_name: 'pause circle outline' })
      : this.setState({ icon_name: 'play circle outline' });
  };
  dimmerClicked = () => {
    // this.setActivePlaylist();
    this.setState({ redirect: true });
  };

  render() {
    const { active, redirect } = this.state;
    if (redirect) {
      return <Redirect to={`/playlist/${this.props.playlist.id}`} />;
    }
    const content = (
      <div>
        <Icon
          name={this.state.icon_name}
          size="huge"
          onClick={this.onPlayPauseClick}
        />
      </div>
    );
    return (
      <Card key={this.props.playlist.name}>
        <Card.Header />
        <Dimmer.Dimmable
          as={Image}
          dimmed={active}
          dimmer={{ active, content }}
          onMouseEnter={this.handleShow}
          onMouseLeave={this.handleHide}
          size="medium"
          src={this.props.playlist.images[0].url}
          wrapped
          ui={false}
          onClick={this.dimmerClicked}
        />

        <Card.Content textAlign="center">
          <Card.Header className="whiteText">
            {this.props.playlist.name}
          </Card.Header>
          <Card.Meta className="greyText">
            <span className="date">
              {this.props.playlist.owner.display_name}
            </span>
          </Card.Meta>
        </Card.Content>
      </Card>
    );
  }
}

export default connect(
  null,
  { setCurrentPlaylist }
)(PlaylistCollection);
