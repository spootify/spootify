import React from 'react';

//Routing
import { Route } from 'react-router-dom';

//Components
import Login from './components/Login/Login';
import DashBoard from './components/Dashboard/Dashboard';
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
    <div className='routes-container'>
        {/* Main Routes */}
        <Route exact path="/" component={Login} />
        <Route path="/dashboard/" component={DashBoard} />
        <Route path="/dashboard/browse" component={BrowseNav} />
        <Route path="/dashboard/browse/overview" component={Overview} />
        <Route path="/dashboard/browse/charts" component={Charts} />
        <Route path="/dashboard/browse/genres" compnonent={Genres} />
        <Route path="/dashboard/browse/releases" component={NewReleases} />


        <Route path="/dashboard/playlist/:ownerId/:playlistId" component={Playlist} />
        <Route path='/dashboard/category/:categoryId/:categoryName' component={Category} />
        <Route path='/dashboard/album/:albumId' component={Album} />
        <Route path='/dashboard/songs' component={Songs} />
        <Route path='/dashboard/Albums' component={Albums} />
        <Route path='/dashboard/Artists' component={Artists} />


    </div>
)