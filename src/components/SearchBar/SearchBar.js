import React, { Component } from 'react';
import { getUser } from '../../ducks/user';
import { updateResults } from '../../ducks/results';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';

class SearchBar extends Component {
    constructor() {
        super()
        this.state = {
            user: {},
            results: {
                albums: [],
                artists: [],
                playlists: []
            }
        }
    }
    componentDidMount() {
        getUser()
    }

    search(input){
        axios.get(`/spotify/search/albums/${input}`).then(albums => {
            axios.get(`/spotify/search/artists/${input}`).then(artists => {
                axios.get(`/spotify/search/playlists/${input}`).then(playlists => {
                    this.setState({
                        results: {
                            albums: albums.data.body.albums.items,
                            artists: artists.data.body.artists.items,
                            playlists: playlists.data.body.playlists.items
                        }
                    })
                    this.props.updateResults(this.state.results)
                })
            })
        })
    }
    render() {
        return (
            <div className='searchBar'>
                <div className='searchDiv'>
                   <Link to='/dashboard/search/results'><input
                        className="searchInput"
                        placeholder="Search"
                        onChange={e => this.search(e.target.value)}
                    /></Link>
                </div>
                <div id='profileDiv' className='searchDiv'>
                    <img src={this.props.user.image} alt={this.props.user.displayName} style={{ height: "30px", borderRadius: "50%" }} />
                    <p>{this.props.user.displayName}</p>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
    }
}

export default connect(mapStateToProps, {getUser, updateResults})(SearchBar);