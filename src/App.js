import React, { Component } from 'react';
import { HashRouter, Route } from 'react-router-dom';

//Components
import SideBar from './components/SideBar/SideBar';
import SearchBar from './components/SearchBar/SearchBar';
import MusicPlayer from './components/MusicPlayer/MusicPlayer';
import Browse from './components/Browse/Browse';

//Routing
import routes from './routes';


import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        {routes}
      </div>
    );
  }
}

export default App;
