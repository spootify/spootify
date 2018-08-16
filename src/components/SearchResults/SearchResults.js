import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';

class SearchResults extends Component {
    render(){
        console.log(this.props.results)

        //Albums
        let albums = this.props.results.albums.filter((element, index) => {
            return index < 9
        }).map((element, index) => {
            return (
                <div className="album-container">
                    <Link to={`/dashboard/album/${element.id}`}><img src={element.images[2].url} alt="album cover"/></Link>
                    <div className="album-split">
                    <h1>{element.name}</h1>
                    <p>{element.artists[0].name}</p>
                    </div>
                </div>
            )
        })

        //Playlists
        let playlists = this.props.results.playlists.filter((element, index) => {
            return index < 9
        }).map((element, index) => {
            return (
                <div className="playlist-container">
                    <Link to={`/dashboard/playlist/${element.owner.id}/${element.id}/nothing/nothing`}><img src={element.images[0].url} alt="album cover"/></Link>
                    <div className="playlist-split">
                        <h1>{element.name}</h1>
                    </div>
                </div>
            )
        })



        return (
            <div className="search-results-container">
                <div style={{display: this.props.results.albums.length === 0 ? 'block' : 'none'}}>
                    <h2>Search Spotify</h2>
                    <p>Find your favorite songs, artists and playlists</p>
                </div>
                <div style={{display: this.props.results.albums.length === 0 ? 'none' : 'block'}}>
                    results
                </div>

                <div className="artists-albums-container">
                    <div className="albums-wrapper">
                        <h1>Albums</h1>
                        <div className="albums-container">
                            {albums}
                        </div>
                    </div>

                    <div className="playlist-wrapper">
                        <h1>Playlists</h1>
                        <div className="playlists-container">
                            {playlists}
                        </div>
                    </div>
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