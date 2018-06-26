import React, { Component } from 'react';
import "./SearchBar.css";

class SearchBar extends Component {
    render(){
        return (
            <div className='searchBar'>
                <button> back </button>
                <button> forward </button>
                <input />
            </div>
        )
    }
}

export default SearchBar;