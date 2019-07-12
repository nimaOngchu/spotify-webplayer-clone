import React, { Component } from 'react';
import setSpotifyWebApi from '../../../../utility/Spotify';
import { connect } from 'react-redux';
import { Card } from 'semantic-ui-react';
import PlaylistCollection from '../../PlaylistCollection';

export class MadeForYou extends Component {
    componentDidMount() {
        setSpotifyWebApi.getSpotify.getRecommendations()
    }
    render() {
        return (
            <div>

            </div>
        )
    }
}
const mapStateToprops = state => ({ user: state.user.currentUser });
export default connect(mapStateToprops, null)(MadeForYou)
