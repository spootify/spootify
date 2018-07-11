import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

export default class Genres extends Component {
	constructor(props) {
		super(props);
		this.state = {
			genresList: []
		}
	}

	componentDidMount() {
		axios.get('/spotify/browse/categories')
			 .then((resp) => this.setState({genresList: resp.data.body.categories.items}))
			 .catch((err) => console.error(err));
	}

	render() {
		console.log(this.state.genresList);
		const display = this.state.genresList.map((e) => (
			<Link key={e.id} to={`/dashboard/category/${e.id}/${e.name}`}>
				<div className="genre-tile">
					<img src={e.icons[0].url} alt=""/>
					<p>{e.name}</p>
				</div>
			</Link>
		));

		return (
			<div className='genres'>
				<h3>Genres & Moods</h3>
				<hr/>
				<div className="genres-wrapper">
					{display}
				</div>
			</div>
		);
	}
};
