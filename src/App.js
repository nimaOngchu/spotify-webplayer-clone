import React, { Component} from 'react';
import { Grid, Image, Segment } from 'semantic-ui-react'
import './App.css';

import SidePanel from './components/SidePanel/SidePanel';

class App extends Component {
  state = {
    login:false
  }
   getHashParams =()=> {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    while ( e = r.exec(q)) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
   }

  componentDidMount() {
    let accessToken = this.getHashParams().access_token;
    accessToken && this.setState({login:true})

  }
  render() {
    return (
      <Segment inverted >
        <Grid style ={{height:'100vh'}} >
          <Grid.Column style={{
            width: '230px', padding: '10px 0 10px 0',
            color: 'rgb(127, 127, 127)'}}   >
          <SidePanel login = {this.state.login}/>
        </Grid.Column>
        <Grid.Column width ={13} color='grey'>
          <Image src='https://react.semantic-ui.com/images/wireframe/media-paragraph.png' />
        </Grid.Column>

    </Grid>
     </Segment>
    );
  }

}

export default App;
