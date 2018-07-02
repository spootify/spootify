import React from 'react';

//Routing
import { Route } from 'react-router-dom';

//Components
import Login from './components/Login/Login';
import DashBoard from './components/Dashboard/Dashboard';
import Playlist from './components/Playlist/Playlist';
import Category from './components/Category/Category';
import Album from './components/Album/Album';

export default (
    <div>
        {/* Main Routes */}
        <Route exact path="/" component={Login} />
        <Route path="/dashboard/browse" component={DashBoard} />
        <Route path="/dashboard/playlist/:ownerId/:playlistId" component={Playlist} />
        <Route path='/dashboard/category/:categoryId/:categoryName' component={Category} />
        <Route path='/dashboard/album/:albumId' component={Album} />
    </div>
)