import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import './MusicPlayer.css';

//Font Awesome
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

//Reducer Functions
import {getUser} from '../../ducks/user';
import {setDeviceID, getCurrentlyPlaying, pauseSong, playSong, skipTrack, previousTrack} from '../../ducks/player';

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
        this.eventHandler = this.eventHandler.bind(this);
        this.playSongFunc = this.playSongFunc.bind(this);
        this.pauseSongFunc = this.pauseSongFunc.bind(this);
        this.nextSongFunc = this.nextSongFunc.bind(this);
        this.previousSongFunc = this.previousSongFunc.bind(this);
    }

    //Lifecycle Hooks
        //Setting Player
    componentDidMount(){
        //Getting User Info
        this.props.getUser();
        //Setting Player SDK
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
        this.getCurrentlyPlaying();
    }

    
    //Initializing the SDK Player
    eventHandler(){
        this.player.addListener('initialization_error', ({message}) => {console.error(message)});
        this.player.addListener('authentication_error', ({ message }) => { console.error(message); });
        this.player.addListener('account_error', ({ message }) => { console.error(message); });
        this.player.addListener('playback_error', ({ message }) => { console.error(message); });
        
        // Playback status updates
        this.player.addListener('player_state_changed', state => { console.log(state); });
        
        // Ready
        this.player.addListener('ready', ({ device_id }) => {
            this.props.setDeviceID(device_id)
            console.log('Ready with Device ID', device_id);
        });
        
        // Not Ready
        this.player.addListener('not_ready', ({ device_id }) => {
            console.log('Device ID has gone offline', device_id);
        });
        // Connect to the player!
        this.player.connect();
    }
    
    // Get Currently Playing
    getCurrentlyPlaying(){
        axios.get('/currently/playing').then(response => {
            console.log(response.data)
            this.setState({currentlyPlayingAlbumCover: response.data.data.item.album.images[2].url, currentlyPlayingArtistName: response.data.data.item.artists[0].name, currentlyPlayingSongName: response.data.data.item.name,
            playing: response.data.data.is_playing,
            })
        })
    }

    //changePlayingState
    changePlayingState(){
        this.setState({playing: !this.state.playing})
    }

    //Play Song
    playSongFunc(){
        this.props.playSong(this.props.player.deviceID);
        this.changePlayingState();
    }

    //Pause Song
    pauseSongFunc(){
        this.props.pauseSong(this.props.player.deviceID);
        this.changePlayingState();
    }

    nextSongFunc(){
        this.props.skipTrack(this.props.player.deviceID);
        this.getCurrentlyPlaying();
    }

    previousSongFunc(){
        this.props.previousTrack(this.props.player.deviceID)
        this.getCurrentlyPlaying();
    }

    render(){
        console.log(this.props.player.deviceID)
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
                        <FontAwesomeIcon icon="step-backward" id="first-icon" onClick={() => this.previousSongFunc()}/>
                        {this.state.playing ?
                        <FontAwesomeIcon icon="pause-circle" id="middle-icon" onClick={() => this.pauseSongFunc()}/>
                        :
                        <FontAwesomeIcon icon="play-circle" id="middle-icon" onClick={() => this.playSongFunc()}/>
                        }
                        <FontAwesomeIcon icon="step-forward" id="last-icon" onClick={() => this.nextSongFunc()}/>
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

function mapStateToProps(state) {
	return {
		user  : state.user,
		player: state.player
	}
}

export default connect(mapStateToProps, {
	setDeviceID,
	getUser,
	getCurrentlyPlaying,
	pauseSong,
	playSong,
	skipTrack,
	previousTrack
})(MusicPlayer);