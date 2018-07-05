import React, { Component } from 'react'
import axios from 'axios';
import { connect } from 'react-redux';
import { changeCurrentSong } from '../../ducks/user';

// import './Songs.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Songs extends Component {
  constructor() {
    super()
    this.state = {
      tracks: [],
      offset: 0,
      highlightedTrack: ''
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

  highlightedTrack(trackId) {
    this.setState({
      highlightedTrack: trackId
    })
  }

  unHighlightTrack(){
    this.setState({
      highlightedTrack: ''
    })
  }

  render() {
    return (
      <div className='flexColumn'>
        {this.state.tracks.map(track => {
          return (
            <div onDoubleClick={() => this.playTrack(track.track.album.uri, track.track.uri)}
              onMouseEnter={() => this.highlightedTrack(track.track.id)} 
              onMouseLeave={() => this.unHighlightTrack()}
              className='flexRow' 
              key={track.track.id}>
              <FontAwesomeIcon icon="play-circle"
                className={this.state.highlightedTrack === track.track.id ? "middle-icon" : "invisable"}
                onClick={() => this.playTrack(track.track.album.uri, track.track.uri)} />
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

function mapStateToProps(state) {
  return {
    currentSong: state.user.currentSong
  }
}

export default connect(mapStateToProps, { changeCurrentSong })(Songs);
