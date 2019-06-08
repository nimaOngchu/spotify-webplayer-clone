import React, {Fragment, Component} from 'react';
import { Card, Icon,Image, Dimmer } from 'semantic-ui-react';

class UserLibrary extends Component {
  state = {
    icon_name:'play circle outline'
  }

  handleShow = () => this.setState({ active: true })
  handleHide = () => this.setState({ active: false })
  onPlayPauseClick = () => {

    this.state.icon_name === 'play circle outline'
      ?
      this.setState({ icon_name: 'pause circle outline' })
      :
      this.setState({icon_name:'play circle outline'})
  }

render()
{
  const { active } = this.state;
  const content = (
    <div>
      <Icon name={this.state.icon_name} size='huge'  onClick={this.onPlayPauseClick}/>
    </div>
  )
  return (

            <Card  key={this.props.playlist.name}>

            <Card.Header />
            <Dimmer.Dimmable
        as={Image}
        dimmed={active}
        dimmer={{ active, content }}
        onMouseEnter={this.handleShow}
        onMouseLeave={this.handleHide}
        size='medium'
              src={this.props.playlist.images[0].url}
              wrapped ui={false}
            />

<Card.Content  textAlign ='center' >
  <Card.Header className='whiteText'>{this.props.playlist.name}</Card.Header>
  <Card.Meta className='greyText'>
    <span className='date'>{this.props.playlist.owner.display_name}</span>
  </Card.Meta>

</Card.Content>

</Card>

)
}
}

export default UserLibrary
