import React, {Component} from 'react';
import axios from 'axios';
import SongList from '../SongList/SongList';

class Playlist extends Component {
	constructor() {
		super()
		this.state = {
			playlist: {},
			image   : '',
			tracks  : []
		}
	}

	componentDidMount() {
		axios.get(`/spotify/playlist/${this.props.match.params.ownerId}/${this.props.match.params.playlistId}`)
			 .then(res => {
				 this.setState({
					 playlist: res.data.body,
					 image   : res.data.body.images[0].url,
					 tracks  : res.data.body.tracks.items
				 })
			 });
	}

	render() {
		return (
			<div className='playlist'>
				<div className="playlist-header">
					<img src={this.state.image} style={{width: "300px"}} alt='playlist'/>
					<h1>{this.state.playlist.name}</h1>
					<p>{this.state.playlist.description}</p>
				</div>
				<SongList tracks={this.state.tracks}/>
			</div>
		)

	}
}

export default Playlist