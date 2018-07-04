import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getUser} from './ducks/user';
import {withRouter} from 'react-router-dom';
import SideBar from './components/SideBar/SideBar';
import Content from './components/Content/Content';
import MusicPlayer from './components/MusicPlayer/MusicPlayer';
import Login from "./components/Login/Login";
class App extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		console.log(this.props);
		this.props.getUser();
	}


	render() {
		console.log(this.props);
		return (
			<div className="App">
				{(this.props.user.id) ?
				 <div>
					 <div className="container">
						 <SideBar/>
						 <Content/>
					 </div>
					 <MusicPlayer/>
				 </div> :
				 <Login/>}
			</div>
		);
	}
}

export default withRouter(connect(({user}) => ({user}), {getUser})(App));