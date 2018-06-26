import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './SideBar.css';
import PlusIcon from './plus-icon.png';

class SideBar extends Component {
    render() {
        return (
            <div className='sideBar'>
                <div>
                    <div>
                        <Link to="/browse">Browse</Link>
                    </div>
                    <div>
                        <h3>YOUR LIBRARY</h3>
                        <Link to="/recently-played">Recently Played</Link>
                        <Link to="/songs">Songs</Link>
                        <Link to="/albums">Albums</Link>
                        <Link to="/artists">Artists</Link>
                    </div>
                    <div>
                        <h3>PLAYLIST</h3>
                        <p>Example Playlist</p>
                    </div>
                </div>
                <div className='flexRow newPlaylistDiv'>
                    <img className='icon' src={PlusIcon} alt='add playlist icon'/>
                    <h2>New Playlist</h2>
                </div>
            </div>
        )
    }
}

export default SideBar;