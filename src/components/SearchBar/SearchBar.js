import React, { Component } from 'react';
import "./SearchBar.css";
import DownArrow from './down-arrow.svg';

class SearchBar extends Component {
    render() {
        return (
            <div className='searchBar'>
                <div className='searchDiv'>
                    <button> back </button>
                    <button> forward </button>
                    <input
                        className="searchInput"
                        placeholder="Search"
                    />
                </div>
                <div className='searchDiv'>
                    <p>User Name</p>
                    <img 
                    className='icon'
                    src={DownArrow} />
                </div>
            </div>
        )
    }
}

export default SearchBar;