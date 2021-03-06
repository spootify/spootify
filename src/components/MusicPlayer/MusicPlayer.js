import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';

//Font Awesome
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

//Reducer Functions
import {getUser} from '../../ducks/user';
import {setDeviceID, getCurrentlyPlaying, pauseSong, playSong, skipTrack, previousTrack, getRecentlyPlayed} from '../../ducks/player';

class MusicPlayer extends Component {
    constructor(props){
        super(props)

        this.player = null;

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
        if(window.Spotify && this.props.user.access_token){
            clearInterval(interval_id);
            this.player = new window.Spotify.Player({
                name: 'Web Playback DSK Quick Start Player',
                getOAuthToken: cb => {cb(this.props.user.access_token)}
            })
            this.eventHandler();
        }
        }, 200);
        this.props.getRecentlyPlayed();
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
        return (
            <div className='musicPlayer'>
                <div className="currently-playing-container">
                    <img src={this.props.player.currentlyPlaying.album ? this.props.player.currentlyPlaying.album.images[1].url : ''} alt="currently playing"/>
                    <div className="song-artist-container">
                        <h3>{this.props.player.currentlyPlaying.album ? this.props.player.currentlyPlaying.name : ''}</h3>
                        <p>{this.props.player.currentlyPlaying.album ? this.props.player.currentlyPlaying.album.artists[0].name : ''}</p>
                    </div>
                </div>

                <div className="player-options-container">
                    <div className="play-button-container">
                        <FontAwesomeIcon icon="random" id="shuffle"/>
                        <FontAwesomeIcon icon="step-backward" id="first-icon" onClick={() => this.previousSongFunc()}/>
                        {this.props.player.isPlaying ?
                        <FontAwesomeIcon icon="pause-circle" id="middle-icon" onClick={() => this.pauseSongFunc()}/>
                        :
                        <FontAwesomeIcon icon="play-circle" id="middle-icon" onClick={() => this.playSongFunc()}/>
                        }
                        <FontAwesomeIcon icon="step-forward" id="last-icon" onClick={() => this.nextSongFunc()}/>
                        <FontAwesomeIcon icon="redo" id="repeat"/>
                    </div>
                </div>

                <div className="volume-container">
                    <FontAwesomeIcon icon="volume-down"/>
                    <div className="green-bar"></div>
                    <FontAwesomeIcon icon="volume-up"/>
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
    previousTrack,
    getRecentlyPlayed
})(MusicPlayer);