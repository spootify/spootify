import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
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
			offset: 6,
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
		if (this.state.startingIndex === 6) {
			null

		} else {
			this.setState({
				offset: this.state.offset + 6,
				startingIndex: this.state.startingIndex + 6
			})
		}
	}

	goBack() {
		if (this.state.startingIndex >= 6) {
			this.setState({
				offset: this.state.offset - 6,
				startingIndex: this.state.startingIndex - 6
			})
		} else {
			null
		}
	}

	render() {
		console.log(this.state.featuredPlaylistsBody)
		return (
			<div className='browseMainView'>
				<div className='messageHeader flexRow'>
					<h3>{this.state.featuredPlaylistsBody.message}</h3>
					<div>
						<img src={downArrow} onClick={() => this.goBack()} style={{ height: "20px", margin: "5px" }} />
						<img src={downArrow} onClick={() => this.getMore()} style={{ height: "20px", margin: "5px" }} />
					</div>
				</div>
				<div className='flexRow'>
					{
						this.state.featuredPlaylists.filter((featPlaylist, i) => {
							return i < this.state.offset && i >= this.state.startingIndex
						}).map((filteredPL, i) => {
							return (
								<div id='featuredPlaylist' className='flexColumn' key={filteredPL.id + i}>
									<img src={filteredPL.images[0].url} style={{ height: "250px" }} />
									<p>{filteredPL.name}</p>
								</div>
							)
						})
					}
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
					<div className='messageHeader flexRow'>
						<h3>Genres & Moods</h3>
					</div>
					{this.state.categories.map((cat, i) => {
						return (
							<div key={cat.id + i}>
								<img src={cat.icons[0].url} style={{margin: "15px"}}/>
							</div>
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