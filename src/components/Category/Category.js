import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

class Category extends Component {
	constructor() {
		super()
		this.state = {
			categoryPlaylists: []
		}
	}

	componentDidMount() {
		axios.get(`/spotify/category/${this.props.match.params.categoryId}`).then(res => {
			console.log(res.data)
			this.setState({
				categoryPlaylists: res.data.body.playlists.items
			})
		})
	}

	render() {
		return (
			<div className='category'>
				<h3>{this.props.match.params.categoryName}</h3>
				<hr/>
				<div className="category-wrapper">
					{this.state.categoryPlaylists.map((playlist, i) => {
						return (
							<Link to={`/dashboard/playlist/${playlist.owner.id}/${playlist.id}/nothing/nothing`} key={playlist.id}>
								<div>
									<img src={playlist.images[0].url} style={{margin: "15px"}} alt='playlist'/>
									<p>{playlist.name}</p>
								</div>
							</Link>
						)
					})}
				</div>
			</div>
		);
	}
}

export default Category;