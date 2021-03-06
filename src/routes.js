import React from 'react';

import {Route, Switch} from 'react-router-dom';

import Home from './components/Home/Home';
import Playlist from './components/Playlist/Playlist';
import Category from './components/Category/Category';
import Album from './components/Album/Album';
import Songs from './components/Songs/Songs';
import Albums from './components/Albums/Albums';
import Artists from './components/Artists/Artists';
import SearchResults from './components/SearchResults/SearchResults';
import Profile from './components/Profile/Profile';

export default (
	<Switch className='routes-container'>
		{/*<Route exact path="/" component={Login}/>*/}
		<Route path="/home/" component={Home}/>
		{/*<Route exact path="/dashboard/browse" component={BrowseNav}/>*/}

		<Route path="/dashboard/playlist/:ownerId/:playlistId/:uri/:id" component={Playlist}/>
		<Route path='/dashboard/category/:categoryId/:categoryName' component={Category}/>
		<Route path='/dashboard/album/:albumId' component={Album}/>
		<Route path='/dashboard/songs' component={Songs}/>
		<Route path='/dashboard/Albums' component={Albums}/>
		<Route path='/dashboard/Artists' component={Artists}/>
		<Route path='/dashboard/search/results' component={SearchResults}/>
		<Route path='/dashboard/profile' component={Profile}/>
	</Switch>
)