import React, { Component } from 'react';
import axios from 'axios';
import SongList from '../SongList/SongList';
import PlayButton from '../PlayButton/PlayButton';

class Playlist extends Component {
	constructor() {
		super()
		this.state = {
			playlist: {},
			image: '',
			tracks: [],
			uri: '',
			id: '',
			searchInput: '',
		}
	}

	componentDidMount() {
		axios.get(`/spotify/playlist/${this.props.match.params.ownerId}/${this.props.match.params.playlistId}`)
			.then(res => {
				this.setState({
					playlist: res.data.body,
					image: <img src={res.data.body.images[0].url} alt="" />,
					tracks: res.data.body.tracks.items,
					uri: res.data.body.tracks.items[0].uri,
					id: res.data.body.tracks.items[0].id
				})
			});
	}

	render() {
		return (
			<div className='playlist'>
				<div className="playlist-header">
					<div className="plylist-image">
						{this.state.image}
					</div>
					<div className="playlist-info">
						<h3>Playist</h3>
						<h1>{this.state.playlist.name}</h1>
						<p>{this.state.playlist.description}</p>
						<PlayButton uri={this.state.uri}
							id={this.state.id}
						/>
					</div>
				</div>
				<input className='filterInput'
					placeholder='Filter'
					onChange={e => this.setState({ searchInput: e.target.value })}
				/>
				<SongList tracks={this.state.tracks} playlistUri={this.state.playlist.uri} searchInput={this.state.searchInput} />
			</div>
		)

	}
}

export default Playlist