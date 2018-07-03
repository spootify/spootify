import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {getUser} from '../../ducks/user';
import './Overview.css';

class Overview extends Component {
	constructor() {
		super();
		this.state = {
			featuredPlaylistsBody: {},
			featuredPlaylists    : [],
			secFeaturedPlaylist  : [],
			categoriesBody       : {},
			categories           : [],
			offset               : 5,
			startingIndex        : 0,
		}
	}

	componentWillMount() {
		this.props.getUser();
		axios.get(`/spotify/browse/featuredPlaylists`).then(res => {
			axios.get('/spotify/browse/categories').then(results => {
				this.setState({
					featuredPlaylistsBody: res.data.body,
					featuredPlaylists    : res.data.body.playlists.items,
					categoriesBody       : results.data.body.categories,
					categories           : results.data.body.categories.items
				})


			})
		})
	}

	getMore() {
		if (this.state.startingIndex === 10) {
			null

		} else {
			this.setState({
				offset       : this.state.offset + 5,
				startingIndex: this.state.startingIndex + 5
			})
		}
	}

	goBack() {
		if (this.state.startingIndex >= 5) {
			this.setState({
				offset       : this.state.offset - 5,
				startingIndex: this.state.startingIndex - 5
			})
		} else {
			null;
		}
	}

	render() {
		return (
			<div className='browseMainView'>
				<div className='messageHeader flexRow'>
					<h3>{this.state.featuredPlaylistsBody.message}</h3>
					<div>
						<div className='arrow arrow-left' onClick={() => this.goBack()}/>
						<div className='arrow arrow-right' onClick={() => this.getMore()}/>
					</div>
				</div>
				<hr/>
				<div className='featuredPlaylists flexRow'>
					{
						this.state.featuredPlaylists.filter((featPlaylist, i) => {
							return i < this.state.offset && i >= this.state.startingIndex
						}).map((filteredPL, i) => {
							return (
								<Link to={`/dashboard/playlist/${filteredPL.owner.id}/${filteredPL.id}`}
									  key={filteredPL.id + i}>
									<div className='featuredPlaylist flexColumn'>
										<img src={filteredPL.images[0].url}/>
										<p>{filteredPL.name}</p>
									</div>
								</Link>
							)
						})
					}
				</div>


				<div className='flexRow subheader'>
					<Link to='/dashboard/browse/charts'>
						<div>
							<h1>Charts</h1>
							<p>Gloabal and regional top charts</p>
						</div>
					</Link>

					<Link to="/dashboard/browse/releases">
						<div>
							<h1>New Releases</h1>
							<p>Drake, Florence + The Machine, Gorillaz</p>
						</div>
					</Link>
				</div>
				<div className='flexRowWrap'>
					<div className='messageHeader flexRow'>
						<h3>Genres & Moods</h3>
					</div>
					<div className='category'>
						{this.state.categories.map((cat, i) => {
							return (
								<Link to={`/dashboard/category/${cat.id}/${cat.name}`} key={cat.id + i}>
									<div>
										<img src={cat.icons[0].url}/>
									</div>
								</Link>
							)
						})}
					</div>
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

export default connect(mapStateToProps, {getUser})(Overview);