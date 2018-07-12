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
      highlightedTrack: '',
      searchInput: '',
    }
  }


  componentDidMount() {
    axios.get(`/spotify/tracks/${this.state.offset}`).then(res => {
      console.log(res)
      this.setState({
        context: '',
        tracks: res.data.data.items,
        trackUri: res.data.data.items[0].track.uri,
        id: res.data.data.items[0].track.id
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

  unHighlightTrack() {
    this.setState({
      highlightedTrack: ''
    })
  }

  render() {
    console.log(this.state.tracksUri, this.state.id)
    return (
      <div>
        <h1 style={{ margin: '15px 0' }}>Songs</h1>
        <div className='flexColumn'>
          <PlayButton uri={this.state.trackUri}
            id={this.state.id}
          />
          <input className='filterInput'
            placeholder='Filter'
            onChange={e => this.setState({ searchInput: e.target.value })}
          />
          <SongList tracks={this.state.tracks} 
                    searchInput={this.state.searchInput}
          />
        </div>
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
