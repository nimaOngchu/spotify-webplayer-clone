import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import setSpotifyWebApi from '../../../utility/Spotify';
import PlaylistCollection from '../PlaylistCollection';
import { Redirect } from 'react-router-dom';
export default function Generes({ listOfGeneres }) {
    const handleLink = (categoryId) => {
        setSpotifyWebApi.getSpotify.getCategoryPlaylists(categoryId)
        .then( playlist=><Redirect />)
    }
    return (
        <>
            <h1>Generes & Moods</h1>
            <Card.Group itemsPerRow={5}>
                {

            listOfGeneres && listOfGeneres.map(genere => (
                <Card
                    key={genere.icons[0].url}
                    style={{ textAlign: 'center', cursor: 'pointer' }}
                    onClick ={()=>{handleLink(genere.id)}}
                >
                    <Image src={genere.icons[0].url} />
                    <span style ={{padding:'1rem'}}>{genere.id}</span>
                </Card>

          ))}
      </Card.Group>
        </>
        )

}