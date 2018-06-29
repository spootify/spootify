import React, { Component } from 'react';
import axios from 'axios';

class Playlist extends Component {
    constructor(){
        super()
        this.state = {
            playlist: {},
            image: '',
        }
    }

    componentDidMount(){
        axios.get(`/spotify/playlist/${this.props.match.params.ownerId}/${this.props.match.params.playlistId}`).then(res => {
            this.setState({
                playlist: res.data.body,
                image: res.data.body.images[0].url
            })
        })
    }

    render() {
        console.log(this.state.playlist, this.state.image)
        return (
        <div>
                <img src={this.state.image} style={{width: "300px"}} alt='playlist'/>
                <p>{this.state.playlist.description}</p>
        </div>
        )

    }
}

export default Playlist