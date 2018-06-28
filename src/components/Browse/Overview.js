import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import {getUser} from '../../ducks/user';

class Overview extends Component {
	componentWillMount() {
		this.props.getUser();
		axios.get('/spotify/browse/featuredPlaylist').then(res => {
			console.log(res.data)
		})
	}

	render() {
		return (
			<div>

			</div>
		)
	}
};

export default connect(({user}) => ({user}), {getUser})(Overview);