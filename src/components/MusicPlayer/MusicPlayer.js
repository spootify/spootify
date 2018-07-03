import React, { Component } from 'react';
import axios from 'axios';
import './MusicPlayer.css';

class MusicPlayer extends Component {
    constructor(props){
        super(props)

        this.state = {
            currentlyPlayingAlbumCover: '',
            currentlyPlayingArtistName: '',
            currentlyPlayingSongName: '',
            item: []
        };


        //Binding Methods
        this.getCurrentlyPlaying = this.getCurrentlyPlaying.bind(this);
    }

    // Get Currently Playing
    getCurrentlyPlaying(){
        axios.get('/currently/playing').then(response => {
            console.log(response)
            this.setState({item: response.data})
        })
    }

    render(){
        console.log(this.state)
        return (
            <div className='musicPlayer'>MusicPlayer>
                <div className="currently-playing">
                    <button onClick={() => this.getCurrentlyPlaying()}></button>
                </div>

                <div className="player-options">
                    <div className="play-button-container">

                    </div>

                    <div className="playback-time-container">
                        
                    </div>
                </div>

                <div className="volume-container">

                </div>
            </div>
        )
    }
}

export default MusicPlayer;