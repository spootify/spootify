import React, { Component } from 'react'
import Spotify from 'spotify-web-api-js';
import {connect} from 'react-redux';
import {getUser} from '../../ducks/user';
import logo from './white-spotify-logo.png';
import './Login.css'

const spotifyWebApi = new Spotify();

class Login extends Component {
    constructor(props){
		super(props);
    
        const params = this.getHashParams();
    
        this.state = {
          loggedIn: params.access_token ? true : false,
          nowPlaying: {
            name: 'Not Checked',
            image: ''
          }
        }
    
        if(params.access_token){
          spotifyWebApi.setAccessToken(params.access_token)
        }
      }

    getHashParams(){
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    while ( e = r.exec(q)) {
        hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
    }

    getNowPlaying(){
    spotifyWebApi.getMyCurrentPlaybackState()
        .then((response) => {
        this.setState({
            nowPlaying: {
            name: response.item.name,
            image: response.item.album.images[0].url
            }
        })
        })
    }

  render() {
    console.log(this.props)
    return (
		<div className='loginScreen'>
			<img id='logo' src={logo} alt='spotify' />
			<a href="http://localhost:3005/auth/spotify">
				<button id='login'>LOG IN</button>
			</a>
			<div id='boxOne' className='box'>
			</div>
			<div id='boxTwo' className='box'>
			</div>
			<div id='boxThree' className='box'>
			</div>
		</div>
    )
  }
}

export default connect(null, {getUser})(Login);