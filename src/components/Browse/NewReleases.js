import React, {Component} from 'react'
import axios from 'axios';
import {Link} from 'react-router-dom'

export default class NewRealeses extends Component {
	constructor() {
		super()
		this.state = {
			newReleases: []
		}
	}

	componentDidMount() {
		axios.get('/spotify/browse/newReleases').then(res => {
			console.log(res)
			this.setState({
				newReleases: res.data.body.albums.items
			})
		})
	}

	render() {
		return (
			<div className='flexRowWrap new-releases'>
				<h3>New albums & singles</h3>
				<hr/>
				<div className="new-releases-wrapper">
					{this.state.newReleases.map(album => {
						return (
							<Link to={`/dashboard/album/${album.id}`} key={album.id}>
								<div>
									<div className="playlist-image">
										<img src={album.images[1].url} alt='album'/>
										<div className="playlist-cover">
											<div className="playlist-button">
											</div>
										</div>
									</div>
									<p>{album.name}</p>
								</div>
							</Link>
						);
					})}
				</div>
			</div>
		);
	}
}
