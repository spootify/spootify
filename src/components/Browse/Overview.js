import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getUser} from '../../ducks/user';

class Overview extends Component {
	componentWillMount() {
		this.props.getUser();
	}

	render() {
		console.log(this.props);
		return (
			<div>

			</div>
		)
	}
};

export default connect(({user}) => ({user}), {getUser})(Overview);