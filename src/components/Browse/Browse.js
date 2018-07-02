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
                <div>
                    {browseRoutes}
                </div>
            </div>
        )
    }
}

export default Browse;