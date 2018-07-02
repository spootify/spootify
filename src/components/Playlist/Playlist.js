import React, { Component } from 'react';
import axios from 'axios';

class Playlist extends Component {
    constructor() {
        super()
        this.state = {
            playlist: {},
            image: '',
            tracks: []
        }
    }

    componentDidMount() {
        axios.get(`/spotify/playlist/${this.props.match.params.ownerId}/${this.props.match.params.playlistId}`).then(res => {
            this.setState({
                playlist: res.data.body,
                image: res.data.body.images[0].url,
                tracks: res.data.body.tracks.items
            })
        })
    }

    render() {
        console.log(this.state.playlist, this.state.tracks, this.state.image)
        return (
            <div>
                <img src={this.state.image} style={{ width: "300px" }} alt='playlist' />
                <h1>{this.state.playlist.name}</h1>
                <p>{this.state.playlist.description}</p>
                {
                    this.state.tracks.map((track, i) => {
                        return (
                            <div className='flexRow' key={track.track.id + i}>
                                <p>{track.track.name}</p>
                                <div className='flexRow'>
                                    {track.track.artists.map(artist => {
                                        return (
                                            <div key={artist.id}>
                                                <p>{artist.name}</p>
                                            </div>
                                        )
                                    })}
                                </div>
                                <p>{track.track.album.name}</p>
                            </div>
                        )
                    })
                }

            </div>
        )

    }
}

export default Playlist