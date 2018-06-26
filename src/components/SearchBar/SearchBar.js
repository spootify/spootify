import React, { Component } from 'react';
import "./SearchBar.css";
import DownArrow from './down-arrow.svg';

class SearchBar extends Component {
    render() {
        return (
            <div className='searchBar'>
                <div className='searchDiv'>
                    <img className='icon' src={DownArrow} 
                    alt='backward'
                    />
                    <img className='icon' src={DownArrow} 
                    alt='forward'
                    />
                    <input
                        className="searchInput"
                        placeholder="Search"
                    />
                </div>
                <div id='profileDiv' className='searchDiv'>
                    <p>User Name</p>
                    <img
                        className='icon'
                        src={DownArrow}
                        alt='profile menu'
                    />
                </div>
            </div>
        )
    }
}

export default SearchBar;