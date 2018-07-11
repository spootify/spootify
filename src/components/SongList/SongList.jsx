import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {playSong, pauseSong} from '../../ducks/player';
import {connect} from 'react-redux';

// import {playPlayList} from '../../ducks/player';

function SongLIst(props) {
	let {tracks} = props;
	console.log(tracks)

	tracks = tracks.map((e) => (
		<tr key={e.track.id}>
			<td><FontAwesomeIcon
				icon="play-circle"
				onClick={() => props.playSong(props.player.deviceID, e.track.uri)}/>
			</td>
			<td>{e.track.name}</td>
			<td>{e.track.artists.map((artist, i, arr) => (
				(arr.length > 1) ? (i === arr.length - 1) ? artist.name : artist.name + ', ' : artist.name))}
			</td>
			<td>{e.track.album.name}</td>
			<td>{Math.floor(e.track.duration_ms / 1000 / 60)}:{(e.track.duration_ms / 60 % 60 < 10) ?
															   '0' + Math.floor(e.track.duration_ms / 60 % 60) :
															   Math.floor(e.track.duration_ms / 60 % 60)}
			</td>
		</tr>
	));

	return (
		<div className='song-list'>
			<table>
				<thead>
				<tr>
					<td></td>
					<td>Title</td>
					<td>Artist</td>
					<td>Album</td>
					<td>Dur</td>
				</tr>
				</thead>
				<tbody>
				{tracks}
				</tbody>
			</table>
		</div>
	);
}

export default connect(({player}) => ({player}),
	{
		playSong,
		pauseSong,
	})
(SongLIst);