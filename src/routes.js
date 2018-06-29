import React from 'react';

//Routing
import { Route } from 'react-router-dom';

//Components
import Login from './components/Login/Login';
import DashBoard from './components/Dashboard/Dashboard';
import Playlist from './components/Playlist/Playlist';

export default (
    <div>
        {/* Main Routes */}
        <Route exact path="/" component={Login} />
        <Route path="/dashboard/browse" component={DashBoard} />
        <Route path="/playlist/:ownerId/:playlistId" component={Playlist} />
    </div>
)