import React, { Component } from 'react';

class BrowseNav extends Component {
    render() {
        return (
            <div className='header'>
                <div className='stickyHeader'>
                    <h1>Browse</h1>
                    <div className='flexRow'>
                        <h3>OVERVIEW</h3>
                        <h3>CHARTS</h3>
                        <h3>GENRES & MOODS</h3>
                        <h3>NEW RELEASES</h3>
                    </div>
                </div>
            </div>
        )
    }
}

export default BrowseNav;