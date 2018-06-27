import React, { Component } from 'react'

//Spotify API Imports
import Spotify from 'spotify-web-api-js';

const spotifyWebApi = new Spotify();

class Login extends Component {
    constructor(){
        super()
    
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
      <div>
        <a href="http://localhost:3005/login"><button>Login With Spotify</button></a>
        <div>
          Now Playing: {this.state.nowPlaying.name}
        </div>

        {/* <img src={this.state.nowPlaying.image} style={{width: 100}}/> */}

        <button onClick={() => this.getNowPlaying()}>Check now playing</button>
      </div>
    )
  }
}

export default Login;