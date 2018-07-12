import React, { Component } from 'react'
import { playSong, pauseSong, getCurrentlyPlaying } from '../../ducks/player';
import { connect } from 'react-redux';
import './PlayButton.css'

class PlayButton extends Component {
    constructor(props) {
        super(props)
        this.state = {
            songPlaying: ''
        }
    }

    playSongUpdateCurrentlyPlaying(trackUri, id) {
        this.props.playSong(this.props.player.deviceID, trackUri);
        setTimeout(() => this.props.getCurrentlyPlaying(), 500)
        this.setState({ songPlaying: id })
    }

    pauseSong() {
        this.props.pauseSong()
        this.setState({ songPlaying: '' })
    }

    render() {
        console.log(this.props)
        return (
            <div>
                <button id='play-button' onClick={this.state.songPlaying === '' ? () => this.playSongUpdateCurrentlyPlaying(this.props.uri, this.props.id) : () => this.pauseSong()}>{this.state.songPlaying === '' ? 'PLAY' : 'PAUSE'}</button>
            </div>
        )
    }
}

export default connect(({ player }) => ({ player }),
    {
        playSong,
        pauseSong,
        getCurrentlyPlaying
    })
    (PlayButton)