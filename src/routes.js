import React from 'react';

//Routing
import {Switch, Route} from 'react-router-dom';

//Components
import Login from './components/Login/Login';
import Browse from './components/Browse/Browse';
import SideBar from './components/SideBar/SideBar';
import SearchBar from './components/SearchBar/SearchBar';
import MusicPlayer from './components/MusicPlayer/MusicPlayer';
import DashBoard from './components/Dashboard/Dashboard';

export default (
    <div>
        {/* Main Routes */}
        <Route exact path="/" component={Login}/>
        <Route path="/dashboard/browse" component={DashBoard} />
    </div>
)