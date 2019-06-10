import * as actionTypes from '../actions/types';
import { combineReducers } from 'redux';

const inintialUserState = {
    user: null,
    loggedIn:false
}

const user_reducer = (state = inintialUserState, action) => {
    switch (action.type) {
        case actionTypes.SET_USER:
            return {
                currentUser: action.payload.currentUser,
                isLoading: false
            };
        default: return state
    }

}

const initialPlaylistsState = {
    playlists: [],
    currentPlaylist:[]
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
        default: return state
    }

}
// Access Token
const initialAccessTokenState = { accessToken: null };
const accessToken_reducer = (state = initialAccessTokenState, action) => {
    switch (action.type) {
        case actionTypes.SET_ACCESS_TOKEN:
            return {
                accessToken:action.payload.accessToken
            }
        default:
            return state
    }
}
const rootReducer = combineReducers({
    user: user_reducer,
    playlists: playlists_reducer,
   getAccessToken:accessToken_reducer
  });
  export default rootReducer;