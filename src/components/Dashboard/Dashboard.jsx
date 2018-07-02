import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';
import SideBar from '../SideBar/SideBar';
import MusicPlayer from '../MusicPlayer/MusicPlayer';
import './Dashboard.css';
import Albums from "../Albums/Albums";
import RecentlyPlayed from "../RecentlyPlayed/RecentlyPlayed";
import Browse from "../Browse/Browse";
import Artists from "../Artists/Artists";
import Songs from "../Songs/Songs";
import Playlist from "../Playlist/Playlist";

class Dashboard extends Component {
	render() {
		return (
			<div>
				<SearchBar/>
				<SideBar/>
				<MusicPlayer/>
				<div className="routes-container">
					<Switch>
						<Route path="/dashboard/browse" component={Browse}/>
						<Route path="/dashboard/recent" component={RecentlyPlayed}/>
						<Route path="/dashboard/songs" component={Songs}/>
						<Route path="/dashboard/albums" component={Albums}/>
						<Route path="/dashboard/artists" component={Artists}/>
						<Route path="/dashboard/playlist/:ownerId/:playlistId" component={Playlist}/>
					</Switch>
				</div>
			</div>
		)
	}
}

export default Dashboard;