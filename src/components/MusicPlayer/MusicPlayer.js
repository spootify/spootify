import React, { Component } from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import './MusicPlayer.css';

//Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

//Reducer Functions
import {getDeviceId, getUser} from '../../ducks/user';

class MusicPlayer extends Component {
    constructor(props){
        super(props)

        this.player;

        this.state = {
            playing: false,
            currentlyPlayingAlbumCover: '',
            currentlyPlayingArtistName: '',
            currentlyPlayingSongName: '',
            previewURL: '',
            deviceID: ''
        };


        //Binding Methods
        this.getCurrentlyPlaying = this.getCurrentlyPlaying.bind(this);
        this.pauseSong = this.pauseSong.bind(this);
        this.switchPlayingState = this.switchPlayingState.bind(this);
        this.skipTrack = this.skipTrack.bind(this);
        this.playSong = this.playSong.bind(this);
        this.eventHandler = this.eventHandler.bind(this);
    }

    //Lifecycle Hooks
    componentDidMount(){
        this.props.getUser();
        let interval_id = setInterval(() => {
        console.log(window.Spotify, this.props.user.access_token);
        if(window.Spotify && this.props.user.access_token){
            console.log('hit')
            clearInterval(interval_id);
            this.player = new window.Spotify.Player({
                name: 'Web Playback DSK Quick Start Player',
                getOAuthToken: cb => {cb(this.props.user.access_token)}
            })
            this.eventHandler();
        }
        }, 3000)
        this.props.getDeviceId();
        this.getCurrentlyPlaying();
    }

    //Playing / Paused
    switchPlayingState(){
        this.setState({playing: !this.state.playing})
    }

    // Get Currently Playing
    getCurrentlyPlaying(){
        axios.get('/currently/playing').then(response => {
            console.log(response.data)
            this.setState({currentlyPlayingAlbumCover: response.data.data.item.album.images[2].url, currentlyPlayingArtistName: response.data.data.item.artists[0].name, currentlyPlayingSongName: response.data.data.item.name,
            playing: response.data.data.is_playing,
            previewURL: response.data.data.item.preview_url
            })
        })
    }

    //Event Handlers
    eventHandler(){
        this.player.addListener('initialization_error', ({message}) => {console.error(message)});
        this.player.addListener('authentication_error', ({ message }) => { console.error(message); });
        this.player.addListener('account_error', ({ message }) => { console.error(message); });
        this.player.addListener('playback_error', ({ message }) => { console.error(message); });

        // Playback status updates
        this.player.addListener('player_state_changed', state => { console.log(state); });

        // Ready
        this.player.addListener('ready', ({ device_id }) => {
            this.setState({deviceID: device_id})
            console.log('Ready with Device ID', device_id);
        });

        // Not Ready
        this.player.addListener('not_ready', ({ device_id }) => {
            console.log('Device ID has gone offline', device_id);
        });
        // Connect to the player!
        this.player.connect();
    }

    //Pause Currently Playing Song
    pauseSong(){
        axios.get('/pause/song').then(response => {
            console.log(response)
            this.switchPlayingState();
        })
    }

    //Play A Currently Paused Song
    playSong(){
        axios.put('/resume/track', {deviceID: this.state.deviceID}).then(response => {
            console.log(this.props.deviceId)
            console.log(response)
        })
        this.switchPlayingState();
    }

    // Skip Track
    skipTrack(){
        axios.get('/skip/next/track').then(response => {
            console.log(response).catch(error => console.log(error))
        })
    }

    //Get Avilable devices
    getDevices(){
        axios.get('/available/devices').then(response => {
            console.log(response)
        })
    }

    render(){
        console.log(this.props)
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
                        <FontAwesomeIcon icon="step-backward" id="first-icon" onClick={() => this.getDevices()}/>
                        {this.state.playing ?
                        <FontAwesomeIcon icon="pause-circle" id="middle-icon" onClick={() => this.pauseSong()}/>
                        :
                        <FontAwesomeIcon icon="play-circle" id="middle-icon" onClick={() => this.playSong()}/>
                        }
                        <FontAwesomeIcon icon="step-forward" id="last-icon" onClick={() => this.skipTrack()}/>
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

function mapStateToProps(state){
    return {
        user: state.user,
        deviceId: state.user.deviceId
    }
}

export default connect(mapStateToProps, {getDeviceId, getUser})(MusicPlayer);