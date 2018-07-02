import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getUser} from '../../ducks/user';
import axios from 'axios';

class Overview extends Component {

	componentWillMount() {
		this.props.getUser();
	}

	//Get Tracks
	getTracks(){
		axios.get('/spotify/browse/newReleases').then(response => {
			console.log(response.data)
		})
	}
	
	render() {
		console.log(this.props.user)
		return (
			<div>
				<button onClick={() => this.getTracks()}>Get Tracks</button>
			</div>
		)
	}
};

//Redux Subscriber
function mapStateToProps(state){
	return {
		user: state.user
	}
}

export default connect(mapStateToProps, {getUser})(Overview);