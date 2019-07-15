import * as actionTypes from '../actions/types';
import { combineReducers } from 'redux';

const inintialUserState = {
    currentUser: null,

}

const user_reducer = (state = inintialUserState, action) => {
    switch (action.type) {
        case actionTypes.SET_USER:
            return {
                currentUser: action.payload.currentUser,

            };
        default: return state
    }

}

const initialPlaylistsState = {
    playlists: [],
    currentPlaylist: [],
    currentSongIndex: null,
    isPlaying: false
}
const playlists_reducer = (state = initialPlaylistsState, action) => {
    switch (action.type) {

        case actionTypes.SET_PLAYLISTS:
            return {
                ...state,
               playlists:action.payload.playlists
            };
            case actionTypes.SET_CURRENT_PLAYLIST:
                return {
                    ...state,
                    currentPlaylist: action.payload.currentPlaylist
            };
        case actionTypes.SET_CURRENT_SONG_INDEX:
            return {
                ...state,
                currentSongIndex:action.payload.currentSongIndex
            }
        case actionTypes.SET_CURRENTLY_PLAYING_PLAYLIST:

            return {
                ...state,
                currentlyPlayingPlaylist: action.payload.currentlyPlayingPlaylist
            }
        case actionTypes.SET_IS_SONG_PLAYING:
            return {
                ...state,
                isPlaying:action.payload.isPlaying
            }
        default: return state
    }

}

const rootReducer = combineReducers({
    user: user_reducer,
    playlists: playlists_reducer,

  });
  export default rootReducer;