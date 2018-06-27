import React, { Component } from 'react';

import BrowserNav from '../BrowseNav/BrowseNav';

class Browse extends Component {
    render(){
        return (
            <div className='mainView'>
                <BrowserNav />
            </div>
        )
    }
}

export default Browse;