import React, { Component } from 'react'
import axios from 'axios';

export default class Artists extends Component {
  constructor(){
    super()
    this.state = {
      offset: 0,
      artists: [],
      tracks: []
    }
  }

  componentDidMount(){
    axios.get(`/spotify/tracks/${this.state.offset}`).then(res => {
      const artists = res.data.data.items.map(art => {
        console.log(art)
        return art.track.artists[0]
      })
      this.setState({
        tracks: res.data.data.items,
        artists: artists
      })

    })
  }

  render() {
    return (
      <div>
        Artists
      
        COMING SOON
      </div>
    )
  }
}
