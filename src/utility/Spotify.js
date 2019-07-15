import Spotify from 'spotify-web-api-js';

const SpotifyWebApi = new Spotify();

const setSpotifyWebApi = () => {
    let accessToken = localStorage.getItem('accessToken');
    // console.log('access token in spotify ' +token);
    SpotifyWebApi.setAccessToken(accessToken);
    return SpotifyWebApi;
}
// const setSpotifyWebApi = {

//     setToken: setToken,
//     getSpotify: SpotifyWebApi
// }
export default setSpotifyWebApi;