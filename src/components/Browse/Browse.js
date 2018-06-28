import React, { Component } from 'react';

//Components
import BrowserNav from '../BrowseNav/BrowseNav';

//Routes
import browseRoutes from './browseRoutes';

class Browse extends Component {
    render(){
        console.log(this.props)
        return (
            <div className='mainView'>
                <BrowserNav />

                {/* Browse Routes */}
                <div className=''>
                    {browseRoutes}
                </div>
            </div>
        )
    }
}

export default Browse;