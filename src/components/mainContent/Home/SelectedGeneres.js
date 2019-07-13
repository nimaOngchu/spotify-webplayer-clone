import React, { Component } from 'react'
import PlaylistCollection from '../PlaylistCollection';
import { Card } from 'semantic-ui-react';

export class SelectedGeneres extends Component {

    render() {
        const {selectedGeneres, genereImage, genereTitle} = this.props.location.state
// console.log(selectedGeneres);
        return (
            <div className='selected-generes-wrapper'>
                <div className="seleceted-genere-header" >
                    <div className="selected-genere-title">
                    <h1> {genereTitle}</h1>
                    </div>
                    <h1 style={{ padding: '2rem'}}>Popular Playlists</h1>
                </div>
                <div style={{padding:'0 2rem 0 2rem'}}>
                <Card.Group itemsPerRow={6}>
                {selectedGeneres && selectedGeneres.playlists.items.map(playlist => (
            <PlaylistCollection key={playlist.id} playlist={playlist} />
          ))}
     </Card.Group>
                </div>

            </div>
        )
    }
}

export default SelectedGeneres
