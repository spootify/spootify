import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { playSong, pauseSong, getCurrentlyPlaying } from '../../ducks/player';
import { connect } from 'react-redux';

class SongList extends Component {
	constructor(props) {
		super(props)
		this.state = {
			songPlaying: '',
			searchInput: '',
		}

		//Binding
		this.playSongUpdateCurrentlyPlaying = this.playSongUpdateCurrentlyPlaying.bind(this);
	}

	componentDidMount(){
		
	}


	//Methods
	playSongUpdateCurrentlyPlaying(trackUri, id) {
		this.props.playSong(this.props.player.deviceID, trackUri);
		// this.props.getCurrentlyPlaying();
		this.setState({ songPlaying: id })
	}

	pauseSong(trackUri) {
		this.props.pauseSong(this.props.player.deviceID, trackUri)
		this.setState({
			songPlaying: '',
		})
	}

	render(props) {
		console.log(this.props)

		let { tracks } = this.props;

		if(this.props.searchInput) {
			tracks =  tracks.filter(eF => {
			return eF.track.name.toLowerCase().includes(this.props.searchInput.toLowerCase())
		}).map((e) => (
			<tr key={e.track.id}>
				<td><FontAwesomeIcon id="play-btn-icon"
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
	} else {
		tracks =  tracks.map((e) => (
			<tr key={e.track.id}>
				<td><FontAwesomeIcon id="play-btn-icon"
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
	}

		return (
			<div className='song-list'>
				<table>
					<thead>
						<tr>
							<td></td>
							<td>Title</td>
							<td>Artist</td>
							<td>Album</td>
							<td><FontAwesomeIcon icon='clock'/></td>
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
	})(SongList);