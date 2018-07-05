import React, { Component } from 'react';
import { connect } from 'react-redux';

class SearchResults extends Component {

    render(){
        return (
            <div>
                <div style={{display: this.props.results.albums.length === 0 ? 'block' : 'none'}}>
                    <h2>Search Spotify</h2>
                    <p>Find your favorite songs, artists and playlists</p>
                </div>
                <div style={{display: this.props.results.albums.length === 0 ? 'none' : 'block'}}>
                    results
                </div>
            </div>
        )
    }
}
function mapStateToProps(state){
    return {
        results: state.results.results
    }
}

export default connect(mapStateToProps)(SearchResults)