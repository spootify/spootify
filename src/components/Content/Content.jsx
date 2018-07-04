import React from 'react';
import SearchBar from '../SearchBar/SearchBar';
import routes from '../../routes';
import BrowseNav from '../BrowseNav/BrowseNav';

function Content(props) {
	return (
		<div className='content'>
			<SearchBar/>
			<BrowseNav/>
			{routes}
		</div>
	);
}

export default Content;