import Spotify from 'spotify-web-api-js';

const SpotifyWebApi = new Spotify();
let accessToken = localStorage.getItem('accessToken');
const setSpotifyWebApi = {
    getSpotify: SpotifyWebApi,
    setToken: SpotifyWebApi.setAccessToken(accessToken)
}
export default setSpotifyWebApi;