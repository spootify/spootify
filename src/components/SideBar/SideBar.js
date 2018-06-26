import React, { Component } from 'react';
import './SideBar.css';
import PlusIcon from './plus-icon.png';

class SideBar extends Component {
    render() {
        return (
            <div className='sideBar'>
                <div>
                    <div>
                        <p>Browse</p>
                    </div>
                    <div>
                        <h3>YOUR LIBRARY</h3>
                        <p>Recently Played</p>
                        <p>Songs</p>
                        <p>Albums</p>
                        <p>Artists</p>
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