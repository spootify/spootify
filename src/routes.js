import React from 'react';

import {Route, Switch} from 'react-router-dom';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import Playlist from './components/Playlist/Playlist';
import Category from './components/Category/Category';
import Album from './components/Album/Album';
import BrowseNav from './components/BrowseNav/BrowseNav';
import Overview from './components/Browse/Overview';
import Charts from './components/Browse/Charts';
import Genres from './components/Browse/Genres';
import NewReleases from './components/Browse/NewReleases';
import Songs from './components/Songs/Songs';
import Albums from './components/Albums/Albums';
import Artists from './components/Artists/Artists';

export default (
	<Switch className='routes-container'>
		{/*<Route exact path="/" component={Login}/>*/}
		<Route path="/home/" component={Home}/>
		{/*<Route exact path="/dashboard/browse" component={BrowseNav}/>*/}

		<Route path="/dashboard/playlist/:ownerId/:playlistId" component={Playlist}/>
		<Route path='/dashboard/category/:categoryId/:categoryName' component={Category}/>
		<Route path='/dashboard/album/:albumId' component={Album}/>
		<Route path='/dashboard/songs' component={Songs}/>
		<Route path='/dashboard/Albums' component={Albums}/>
		<Route path='/dashboard/Artists' component={Artists}/>
	</Switch>
)