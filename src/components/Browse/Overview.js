import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import {getUser} from '../../ducks/user';

class Overview extends Component {
	componentWillMount() {
		this.props.getUser();
	}

	getTracks() {
		axios.get('/spotify/library/songs').then(res => {
			console.log(res.data)
		})
	}
	
	render() {
		console.log(this.props)
		return (
			<div>
				<button onClick={()=> this.getTracks()}>get saved tracks</button>
			</div>
		)
	}
};
function mapStateToProps(state){
	return {
		user: state
	}
}

export default connect(mapStateToProps, {getUser})(Overview);