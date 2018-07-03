import React, { Component } from 'react';
import axios from 'axios';
import './MusicPlayer.css';

//Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class MusicPlayer extends Component {
    constructor(props){
        super(props)

        this.state = {
            currentlyPlayingAlbumCover: '',
            currentlyPlayingArtistName: '',
            currentlyPlayingSongName: '',
        };


        //Binding Methods
        this.getCurrentlyPlaying = this.getCurrentlyPlaying.bind(this);
    }

    //Lifecycle Hooks
    componentDidMount(){
        this.getCurrentlyPlaying();
    }

    // Get Currently Playing
    getCurrentlyPlaying(){
        axios.get('/currently/playing').then(response => {
            console.log(response)
            this.setState({currentlyPlayingAlbumCover: response.data.data.item.album.images[2].url, currentlyPlayingArtistName: response.data.data.item.artists[0].name, currentlyPlayingSongName: response.data.data.item.name})
        })
    }

    render(){
        console.log(this.state)
        return (
            <div className='musicPlayer'>
                <div className="currently-playing-container">
                    <img src={this.state.currentlyPlayingAlbumCover} alt="album cover"/>
                    <div className="song-artist-container">
                        <h3>{this.state.currentlyPlayingSongName}</h3>
                        <p>{this.state.currentlyPlayingArtistName}</p>
                    </div>
                </div>

                <div className="player-options-container">
                    <div className="play-button-container">
                        <FontAwesomeIcon icon="step-backward" id="first-icon"/>
                        <FontAwesomeIcon icon="play-circle" id="middle-icon"/>
                        <FontAwesomeIcon icon="step-forward" id="last-icon"/>
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