import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { playSong, pauseSong, getCurrentlyPlaying } from '../../ducks/player';
import { connect } from 'react-redux';

class SongList extends Component {
	constructor(props) {
		super(props)
		this.state = {
			songPlaying: ''
		}

		//Binding
		this.playSongUpdateCurrentlyPlaying = this.playSongUpdateCurrentlyPlaying.bind(this);
	}


	//Methods
	playSongUpdateCurrentlyPlaying(trackUri, id) {
		this.props.playSong(this.props.player.deviceID, trackUri);
		setTimeout(() => this.props.getCurrentlyPlaying(), 500)
		this.setState({ songPlaying: id })
	}

	pauseSong() {
		this.props.pauseSong()
		this.setState({
			songPlaying: '',
		})
	}


	render(props) {

		let { tracks } = this.props;

		tracks = tracks.filter(eF => {
			return eF.track.name.toLowerCase().includes(this.props.searchInput.toLowerCase())
		}).map((e) => (
			<tr key={e.track.id}>
				<td><FontAwesomeIcon
					icon={this.state.songPlaying === e.track.id ? 'pause-circle' : "play-circle"}
					onClick={this.state.songPlaying === '' ? () => this.playSongUpdateCurrentlyPlaying(e.track.uri, e.track.id) : () => this.pauseSong()} />
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

export default connect(({ player }) => ({ player }),
	{
		playSong,
		pauseSong,
		getCurrentlyPlaying
	})
	(SongList);