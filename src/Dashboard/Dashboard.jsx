import React, { Component } from 'react'

//Components
import SearchBar from '../components/SearchBar/SearchBar';
import SideBar from '../components/SideBar/SideBar';
import MusicPlayer from '../components/MusicPlayer/MusicPlayer';

export default class Dashboard extends Component {
  render() {
    return (
      <div>
        <SearchBar />
        <SideBar />
        <MusicPlayer />
      </div>
    )
  }
}
