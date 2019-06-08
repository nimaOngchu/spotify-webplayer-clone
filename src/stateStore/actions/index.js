import * as actionTypes from './types';

// usertype action

export const setUser = user => {
    return {
        type: actionTypes.SET_USER,
        payload: {
            currentUser: user
        }
    }
};

// Playlists action
export const setPlaylists = playlists => {
    return {
        type: actionTypes.SET_PLAYLISTS,
        payload: {
            playlists: playlists
        }
    }
};