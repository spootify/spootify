import React, { Component } from 'react'
import axios from 'axios';

export default class Albums extends Component {
  constructor(){
    super()
    this.state = {
      albums: []
    }
  }

  componentDidMount(){
    axios.get('/spotify/saved/albums').then(albums => {
      this.setState({
        albums: albums.data.data.items
      })
    })
  }

  render() {
    console.log(this.state.albums)
    return (
      <div className='flexRowWrap'>
        {this.state.albums.map(album => {
          return(
            <div key={album.album.id}>
              <img src={album.album.images[1].url} />
              <p>{album.album.name}</p>
              <p>{album.album.artists[0].name}</p>
            </div>
          )
        })}
      </div>
    )
  }
}
