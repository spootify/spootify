import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import {getUser} from '../../ducks/user';

class Overview extends Component {
	componentWillMount() {
		this.props.getUser();
	}
	
	render() {
		console.log(this.props.user)
		return (
			<div>
			</div>
		)
	}
};
function mapStateToProps(state){
	return {
		user: state.user
	}
}

export default connect(mapStateToProps, {getUser})(Overview);