import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { getUser } from '../../ducks/user';

class Overview extends Component {
	constructor() {
		super()
		this.state = {
			featuredPlaylistBody: {},
			featuredPlaylists: [],
			categoriesBody: {},
			categories: [],
		}
	}
	componentWillMount() {
		this.props.getUser();
		axios.get('/spotify/browse/featuredPlaylist').then(res => {
			axios.get('/spotify/browse/categories').then(results => {
				this.setState({
					featuredPlaylistBody: res.data.body,
					featuredPlaylists: res.data.body.playlists.items,
					categoriesBody: results.data.body.categories,
					categories: results.data.body.categories.items
				})

			})
		})
	}

	render() {
		console.log(this.state.categories)

		return (
			<div>
				<h3>{this.state.featuredPlaylistBody.message}</h3>
				<div className='flexRow'>
					{this.state.featuredPlaylists.map(featPlaylist => {
						return (
							<div key={featPlaylist.id}>
								<img src={featPlaylist.images[0].url} />
							</div>
						)
					})}
				</div>
				<div className='flexRow'>
					<div>
						<h1>Charts</h1>
						<p>Gloabal and regional top charts</p>
					</div>
					<div>
						<h1>New Releases</h1>
						<p>Drake, Florence + The Machine, Gorillaz</p>
					</div>
				</div>
				<div className='flexRowWrap'>
					{this.state.categories.map( (cat, i) => {
						return (
						<div key={cat.id + i}>
							<img src={cat.icons[0].url} />
						</div>
						)
					})}
				</div>
			</div>
		)
	}
};
function mapStateToProps(state) {
	return {
		user: state
	}
}

export default connect(mapStateToProps, { getUser })(Overview);