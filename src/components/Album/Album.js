import React, { Component } from 'react'
import axios from 'axios';

export default class Album extends Component {
    constructor() {
        super()
        this.state = {
            album: {},
            image: '',
            tracks: []
        }
    }
    componentDidMount() {
        axios.get(`/spotify/album/${this.props.match.params.albumId}`).then(res => {
            console.log(res)
            this.setState({
                album: res.data.body,
                image: res.data.body.images[1].url,
                tracks: res.data.body.tracks.items
            })
        })
    }
    render() {
        return (
            <div>
                <img src={this.state.image} />
                <h1>{this.state.album.name}</h1>
                {this.state.tracks.map( (track, i) => {
                    return (
                        <div key={track.id + i}>
                            <p>{track.name}</p>
                            <p>{track.duration_ms}</p>
                        </div>
                    )


                })}
            </div>
        )
    }
}
