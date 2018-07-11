import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import PlusIcon from './plus-icon.png';

class SideBar extends Component {
	render() {
		return (
			<div className='sideBar'>
				<div className='textColumn'>
					<div>
						<Link to="/home/browse/overview"><p className='sideBarText pTags'>Browse</p></Link>
					</div>
					<div>
						<p className='sideBarText'>YOUR LIBRARY</p>
						<Link to="/dashboard/songs"><p className='sideBarText pTags'>Songs</p></Link>
						<Link to="/dashboard/albums"><p className='sideBarText pTags'>Albums</p></Link>
						<Link to="/dashboard/artists"><p className='sideBarText pTags'>Artists</p></Link>
					</div>
					<div>
						<p className='sideBarText'>PLAYLIST</p>
						<p className='sideBarText pTags'>Example Playlist</p>
					</div>
				</div>
				
			</div>
		)
	}
}

export default SideBar;