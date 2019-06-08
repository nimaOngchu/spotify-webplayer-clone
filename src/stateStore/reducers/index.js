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
    playlists: []
}
const playlists_reducer = (state = initialPlaylistsState, action) => {
    switch (action.type) {
        case actionTypes.SET_PLAYLISTS:
            return {
               playlists:action.payload.playlists
            };
        default: return state
    }

}

const rootReducer = combineReducers({
    user: user_reducer,
   playlists: playlists_reducer
  });
  export default rootReducer;