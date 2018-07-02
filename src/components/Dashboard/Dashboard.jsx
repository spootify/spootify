import React, { Component } from 'react'

//Components
import SearchBar from '../SearchBar/SearchBar';
import SideBar from '../SideBar/SideBar';
import MusicPlayer from '../MusicPlayer/MusicPlayer';

//Rooutes
import dashboardRoutes from '../Dashboard/dashboardRoutes';

//Styling
import './Dashboard.css';

class Dashboard extends Component {
  render() {
    return (
      <div>
        {/* Main Components */}
        <SearchBar />
        <SideBar />
        <MusicPlayer />

        {/* Routes */}
        <div className="routes-container">
          {dashboardRoutes}
        </div>
      </div>
    )
  }
}

export default Dashboard;