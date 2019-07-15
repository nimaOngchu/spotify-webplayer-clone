import React, { Component } from 'react';
import { Card, Icon, Image, Dimmer } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { setCurrentPlaylist } from '../../stateStore/actions';
import setSpotifyWebApi from '../../utility/Spotify';
import { Redirect } from 'react-router-dom';

class PlaylistCollection extends Component {
  state = {
    redirect: false,
    playlist: null
  };
  componentDidMount() {

}
  handleShow = () => this.setState({ active: true });
  handleHide = () => this.setState({ active: false });
  setActivePlaylist = () => {
    const playlistType = this.props.playlist.type;
    playlistType === 'playlist'
      ? setSpotifyWebApi()
          .getPlaylist(this.props.playlist.id)
          .then(playlist => {
            this.props.setCurrentPlaylist(playlist);
          })
      : setSpotifyWebApi()
          .getAlbum(this.props.playlist.id)
          .then(playlist => {
            this.props.setCurrentPlaylist(playlist);
          });
  };

  dimmerClicked = () => {
    this.setActivePlaylist();
    this.setState({ redirect: true });
  };

  render() {
    const { active, redirect } = this.state;
    if (redirect) {
      return (
        <Redirect
          key={this.props.playlist.id}
          to={`/playlist/${this.props.playlist.id}`}
        />
      );
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
          src={this.props.playlist.images[0]?this.props.playlist.images[0].url:null}
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
              {this.props.playlist.owner?this.props.playlist.owner.display_name : this.props.playlist.artists[0].name}
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
