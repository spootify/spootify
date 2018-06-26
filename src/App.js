import React, { Component } from 'react';
import './App.css';
import { HashRouter, Route } from 'react-router-dom';
import SideBar from './components/SideBar/SideBar';
import SearchBar from './components/SearchBar/SearchBar';
import MusicPlayer from './components/MusicPlayer/MusicPlayer';
import Browse from './components/Browse/Browse';

class App extends Component {
  render() {
    return (
      <div className="App">
        <SearchBar />
        <SideBar />
        <MusicPlayer />
        <HashRouter>
          <div className='routes'>
            <Route path='/browse' component={Browse} />
          </div>
        </HashRouter>
      </div>
    );
  }
}

export default App;
