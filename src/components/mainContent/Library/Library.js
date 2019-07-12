import React, { Component } from 'react';
import Navbar from '../Navbar';
import {Button } from 'semantic-ui-react';
import { Route ,Redirect, Switch} from 'react-router-dom';
import UsersPlaylists from './library_content/UsersPlaylists';
import MadeForYou from './library_content/MadeForYou';
import LikedSongs from './library_content/LikedSongs';

const NavItems = [
    'your-playlists' ,
    'made-for-You' ,
    'liked-songs'
 ];

export default class Library extends Component {

    render() {

        const libraryStyle ={
            padding:'2rem',
          overflowY: 'scroll',
          height:'100%'
        }
        return (
            <div style ={libraryStyle}>
            <Navbar NavItems={NavItems} link="/library"/>
            <div className="button-wrapper">
              <Button
                children="New Playlist"
                color="green"
                style={{ borderRadius: '100px' }}
              />
                </div>
                <Switch>
                    <Redirect exact from='/library' to='/library/your-playlists' />
                    <Route path='/library/your-playlists' component={UsersPlaylists} />
                    <Route path='/library/made-for-you' component={MadeForYou} />
                    <Route path ='/library/liked-songs' component ={LikedSongs}/>
                </Switch>

          </div>
        )
    }
}
