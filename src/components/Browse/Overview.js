import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { getUser } from '../../ducks/user';
import './Browse.css';
import downArrow from '../SearchBar/down-arrow.svg'

class Overview extends Component {
	constructor() {
		super()
		this.state = {
			featuredPlaylistsBody: {},
			featuredPlaylists: [],
			secFeaturedPlaylist: [],
			categoriesBody: {},
			categories: [],
			offset: 5,
			startingIndex: 0,
		}
	}
	componentWillMount() {
		this.props.getUser();
		axios.get(`/spotify/browse/featuredPlaylists`).then(res => {
			axios.get('/spotify/browse/categories').then(results => {
				this.setState({
					featuredPlaylistsBody: res.data.body,
					featuredPlaylists: res.data.body.playlists.items,
					categoriesBody: results.data.body.categories,
					categories: results.data.body.categories.items
				})



			})
		})
	}

	getMore() {
		if (this.state.startingIndex === 10) {
			null

		} else {
			this.setState({
				offset: this.state.offset + 5,
				startingIndex: this.state.startingIndex + 5
			})
		}
	}

	goBack() {
		if (this.state.startingIndex >= 5) {
			this.setState({
				offset: this.state.offset - 5,
				startingIndex: this.state.startingIndex - 5
			})
		} else {
			null
		}
	}

	render() {
		return (
			<div className='browseMainView'>
				<div className='messageHeader flexRow'>
					<h3>{this.state.featuredPlaylistsBody.message}</h3>
					<div>
						<img src={downArrow} onClick={() => this.goBack()} style={{ height: "20px", margin: "5px" }} />
						<img src={downArrow} onClick={() => this.getMore()} style={{ height: "20px", margin: "5px" }} />
					</div>
				</div>
				<div id='featuredPlaylists' className='flexRow'>
					{
						this.state.featuredPlaylists.filter((featPlaylist, i) => {
							return i < this.state.offset && i >= this.state.startingIndex
						}).map((filteredPL, i) => {
							return (
								<Link to={`/dashboard/playlist/${filteredPL.owner.id}/${filteredPL.id}`} key={filteredPL.id + i}>
									<div id='featuredPlaylist' className='flexColumn'>
										<img src={filteredPL.images[0].url} style={{ height: "250px" }} />
										<p>{filteredPL.name}</p>
									</div>
								</Link>
							)
						})
					}
				</div>


				<div className='flexRow'>
					<Link to='/dashboard/browse/charts'><div>
						<h1>Charts</h1>
						<p>Gloabal and regional top charts</p>
					</div></Link>

					<Link to="/dashboard/browse/releases"><div>
						<h1>New Releases</h1>
						<p>Drake, Florence + The Machine, Gorillaz</p>
					</div></Link>
				</div>
				<div className='flexRowWrap'>
					<div className='messageHeader flexRow'>
						<h3>Genres & Moods</h3>
					</div>
					{this.state.categories.map((cat, i) => {
						return (
							<Link to={`/dashboard/category/${cat.id}/${cat.name}`} key={cat.id + i}><div >
								<img src={cat.icons[0].url} style={{ margin: "15px" }} />
							</div></Link>
						)
					})}
				</div>
			</div >
		)
	}
};
function mapStateToProps(state) {
	return {
		user: state
	}
}

export default connect(mapStateToProps, { getUser })(Overview);