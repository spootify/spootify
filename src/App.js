import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {getUser} from './ducks/user';
import Login from "./components/Login/Login";
import './App.css';
import Dashboard from "./components/Dashboard/Dashboard";

class App extends Component {
	componentDidMount() {
		this.props.getUser();
	}

	render() {
		console.log(this.props);
		return (
			<div className="App">
				{(this.props.user.id) ? <Dashboard/> : <Login/>}
			</div>
		);
	}
}

export default withRouter(connect(({user}) => ({user}), {getUser})(App));
