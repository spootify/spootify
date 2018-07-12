import React, {Component} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {playSong, pauseSong, getCurrentlyPlaying} from '../../ducks/player';
import {connect} from 'react-redux';

class SongLIst extends Component {
	constructor(props){
		super(props)

		//Binding
		this.playSongUpdateCurrentlyPlaying = this.playSongUpdateCurrentlyPlaying.bind(this);
	}


	//Methods
	playSongUpdateCurrentlyPlaying(trackUri){
		this.props.playSong(this.props.player.deviceID, trackUri);
		setTimeout(() => this.props.getCurrentlyPlaying(), 500)
	}


	render(props){

	let {tracks} = this.props;
	tracks = tracks.map((e) => (
		<tr key={e.track.id}>
			<td><FontAwesomeIcon
				icon="play-circle"
				onClick={() => this.playSongUpdateCurrentlyPlaying(e.track.uri)}/>
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
	)
}

}

export default connect(({player}) => ({player}),
	{
		playSong,
		pauseSong,
		getCurrentlyPlaying
	})
(SongLIst);