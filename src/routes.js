import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Login from './components/Login/Login';
import DashBoard from './components/Dashboard/Dashboard';
import Playlist from './components/Playlist/Playlist';
import Category from './components/Category/Category';
import Album from './components/Album/Album';

export default (
	<Switch>
		<Route path="/dashboard/browse" component={DashBoard}/>

		<Route path='/dashboard/category/:categoryId/:categoryName' component={Category}/>
		<Route path='/dashboard/album/:albumId' component={Album}/>
	</Switch>
)