import React from 'react';
import { connect } from 'react-redux';
import { setCurrentPlaylist } from '../../../../stateStore/actions'
import formatSearchedSongsForPlaylist from '../../../../utility/dataFormatter/formatSearchedSongsForPlaylist'
import TrackList from '../../Playlist/TrackList';
 function SearchedSongs({songs}) {
     const songList = formatSearchedSongsForPlaylist(songs);
     setCurrentPlaylist(songList)
    return (
        <TrackList songs={songList.tracks.items}/>
    )
}
export default connect(null , {setCurrentPlaylist})(SearchedSongs)
