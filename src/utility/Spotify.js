import Spotify from 'spotify-web-api-js';

const SpotifyWebApi = new Spotify();
let accessToken = localStorage.getItem('accessToken');
console.log('access token ' +accessToken);
let setToken = SpotifyWebApi.setAccessToken(accessToken)
const setSpotifyWebApi = {

    setToken: setToken,
    getSpotify: SpotifyWebApi
}
export default setSpotifyWebApi;