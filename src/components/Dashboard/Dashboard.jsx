import React, { Component } from 'react'

//Components
import SearchBar from '../SearchBar/SearchBar';
import SideBar from '../SideBar/SideBar';
import MusicPlayer from '../MusicPlayer/MusicPlayer';

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
      </div>
    )
  }
}

export default Dashboard;