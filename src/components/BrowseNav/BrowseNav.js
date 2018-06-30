import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class BrowseNav extends Component {
    render() {
        return (
            <div>
                <div>
                    <h1>Browse</h1>
                    <div className='flexRow'>
                        <Link to='/dashboard/browse/overview'><h3>OVERVIEW</h3></Link>
                        <Link to='/dashboard/browse/charts'><h3>CHARTS</h3></Link>
                        <Link to='/dashboard/browse/genres'><h3>GENRES & MOODS</h3></Link>
                        <Link to='/dashboard/browse/releases'><h3>NEW RELEASES</h3></Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default BrowseNav;