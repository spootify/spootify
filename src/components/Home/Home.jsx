import React, {Component} from 'react'
import BrowseNav from '../BrowseNav/BrowseNav';
import Overview from "../Browse/Overview";
import Genres from "../Browse/Genres";
import Charts from "../Browse/Charts";
import NewReleases from "../Browse/NewReleases";
import {Route, Switch} from 'react-router-dom';

class Home extends Component {
	render() {
		return (
			<div className='dashboard'>
				<BrowseNav/>
				<Route path="/home/browse/overview" component={Overview}/>
				<Route path="/home/browse/charts" component={Charts}/>
				<Route path="/home/browse/genres" compnonent={Genres}/>
				<Route path="/home/browse/releases" component={NewReleases}/>
			</div>
		);
	}
}

export default Home;