import React, {Component} from 'react';
import { Card, Image } from 'semantic-ui-react';
import setSpotifyWebApi from '../../../utility/Spotify';
import { Redirect } from 'react-router-dom';
export default class Generes extends Component {
    state = {
        selectedGeneres: null,
        genereImage:null,
        redirect: false
    }
    handleLink = async (categoryId, image) => {
        setSpotifyWebApi().getCategory(categoryId)
        .then(reslt=> console.log(reslt))
        const selectedGeneres = await setSpotifyWebApi().getCategoryPlaylists(categoryId);
        this.setState({
            selectedGeneres: selectedGeneres,
            genereImage: image,
            genereTitle:categoryId,
            redirect: true

        })
          }
    render() {

        const { listOfGeneres } = this.props;

        if (this.state.redirect)
        {
            return <Redirect to={{
                pathname: '/selected-generes',
                state: {
                    selectedGeneres: this.state.selectedGeneres,
                    genereImage: this.state.genereImage,
                    genereTitle: this.state.genereTitle
                }
        }} /> }
    return (
        <>
            <h1>Generes & Moods</h1>
            <Card.Group itemsPerRow={5}>
                {

            listOfGeneres && listOfGeneres.map(genere => (
                <Card
                    key={genere.icons[0].url}
                    style={{ textAlign: 'center', cursor: 'pointer' }}
                    onClick ={()=>{this.handleLink(genere.id, genere.icons[0].url)}}
                >
                    <Image src={genere.icons[0].url} />
                    <span style ={{padding:'1rem'}}>{genere.id}</span>
                </Card>

          ))}
      </Card.Group>
        </>
        )
}
}