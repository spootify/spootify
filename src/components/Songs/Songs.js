import React, { Component } from 'react'
import axios from 'axios';
import { connect } from 'react-redux';
import { changeCurrentSong } from '../../ducks/user';

class Songs extends Component {
  constructor() {
    super()
    this.state = {
      tracks: [],
      offset: 0
    }
  }


  componentDidMount() {
    axios.get(`/spotify/tracks/${this.state.offset}`).then(res => {
      this.setState({
        tracks: res.data.data.items
      })
    })
  }

  playTrack(albumUri, trackUri) {
    this.props.changeCurrentSong(albumUri, trackUri)
  }

  render() {
    return (
      <div className='flexColumn'>
        {this.state.tracks.map(track => {
          return (

            <div onDoubleClick={() => this.playTrack(track.track.album.uri, track.track.uri)} className='flexRow' key={track.track.id}>
              <p>{track.track.name}</p>
              {track.track.artists.map(artist => {
                return (
                  <div key={artist.id}>
                    <p>{artist.name}</p>
                  </div>
                )
              })}
              <p>{track.track.album.name}</p>
              <p>{track.track.album.release_date}</p>
              <p>{track.track.duration_ms}</p>
            </div>
          )
        })}
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    currentSong: state.user.currentSong
  }
}

export default connect(mapStateToProps, { changeCurrentSong })(Songs);
