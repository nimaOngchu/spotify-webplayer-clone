import Spotify from 'spotify-web-api-js';

const SpotifyWebApi = new Spotify();
let accessToken = localStorage.getItem('accessToken');

// let setToken = SpotifyWebApi.setAccessToken(accessToken)
const setSpotifyWebApi = (token =accessToken) => {
    console.log('access token in spotify ' +token);
    SpotifyWebApi.setAccessToken(accessToken);
    return SpotifyWebApi;
}
// const setSpotifyWebApi = {

//     setToken: setToken,
//     getSpotify: SpotifyWebApi
// }
export default setSpotifyWebApi;