import React, { Component } from 'react';
import { HashRouter, Route } from 'react-router-dom';

//Components
import SideBar from './components/SideBar/SideBar';
import SearchBar from './components/SearchBar/SearchBar';
import MusicPlayer from './components/MusicPlayer/MusicPlayer';
import Browse from './components/Browse/Browse';
import Login from './components/Login/Login';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <SearchBar />
        <SideBar />
        <MusicPlayer />
        <Login />
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
