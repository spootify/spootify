import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PlusIcon from './plus-icon.png';
import axios from 'axios';

class SideBar extends Component {
	constructor() {
		super()
		this.state = {
			playlists: [],
			uri: '',
			id: '',
		}
	}
	componentDidMount() {
		axios.get('/spotify/saved/playlists').then(res => {
			this.setState({
				playlists: res.data.data.items,
				uri: res.data.data.items[0].uri,
				id: res.data.data.items[0].id
			})
		})
	}
	render() {
		console.log(this.state)
		return (
			<div className='sideBar'>
				<div className='textColumn'>
					<div>
						<Link to="/home/browse/overview"><p className='sideBarText pTags'>Browse</p></Link>
					</div>
					<div>
						<p className='sideBarText'>YOUR LIBRARY</p>
						<Link to="/dashboard/songs"><p className='sideBarText pTags'>Songs</p></Link>
						<Link to="/dashboard/albums"><p className='sideBarText pTags'>Albums</p></Link>
						<Link to="/dashboard/artists"><p className='sideBarText pTags'>Artists</p></Link>
					</div>
					<div>
						<p className='sideBarText'>PLAYLIST</p>
						{this.state.playlists.map(playlist => {
							return (
								<Link to={`/dashboard/playlist/${playlist.owner.id}/${playlist.id}/${this.state.uri}/${this.state.id}`}><p key={playlist.id} className='sideBarText pTags'>{playlist.name}</p></Link>
							)
						})}
					</div>
				</div>

			</div>
		)
	}
}

export default SideBar;