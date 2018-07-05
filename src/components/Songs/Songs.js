import React, { Component } from 'react'
import axios from 'axios';
import { connect } from 'react-redux';
import { changeCurrentSong } from '../../ducks/user';

import SongList from '../SongList/SongList';
import PlayButton from '../PlayButton/PlayButton';

class Songs extends Component {
  constructor() {
    super()
    this.state = {
      context: '',
      tracks: [],
      offset: 0,
      highlightedTrack: ''
    }
  }


  componentDidMount() {
    axios.get(`/spotify/tracks/${this.state.offset}`).then(res => {
      console.log(res)
      this.setState({
        context: '',
        tracks: res.data.data.items,
        
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
        <PlayButton />
        <SongList tracks={this.state.tracks}/>
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
