import React from 'react';

function SongLIst(props) {
	let {tracks} = props;
	console.log(tracks);
	tracks = tracks.map((e) => (
		<tr key={e.track.id}>
			<td>PlayBut</td>
			<td>{e.track.name}</td>
			<td>{e.track.artists.map((artist) => artist.name)}</td>
			<td>{e.track.album.name}</td>
			<td>{Math.floor(e.track.duration_ms / 1000 / 60)}:{(e.track.duration_ms / 60 % 60 < 10) ?
															   '0' + Math.floor(e.track.duration_ms / 60 % 60) :
															   Math.floor(e.track.duration_ms / 60 % 60)}
			</td>
		</tr>
	))
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

export default SongLIst;