import React, {Component} from 'react'
import axios from 'axios';
import SongList2 from '../SongList2/SongList2';
import PlayButton from '../PlayButton/PlayButton';

export default class Album extends Component {
	constructor() {
		super()
		this.state = {
			album : {},
			image : '',
			tracks: []
		}
	}

	componentDidMount() {
		axios.get(`/spotify/album/${this.props.match.params.albumId}`).then(res => {
			this.setState({
				album : res.data.body,
				image : res.data.body.images[1].url,
				tracks: res.data.body.tracks.items,
				uri   : res.data.body.tracks.items[0].uri,
				id    : res.data.body.tracks.items[0].id
			})
		})
	}

	render() {
		return (
			<div className='album'>
				<div className="album-header">
					<div className="album-image">
						<img src={this.state.image}/>
					</div>
					<div className="album-info">
						<h1>{this.state.album.name}</h1>
						<PlayButton uri={this.state.uri}/>
					</div>
				</div>
				<SongList2 tracks={this.state.tracks} album={this.state.album}/>
			</div>
		);
	}
}
