import React, { Component } from 'react'
import axios from 'axios';
import './Albums.css';
import { Link } from 'react-router-dom';

export default class Albums extends Component {
  constructor() {
    super()
    this.state = {
      albums: [],
      searchInput: '',
    }
  }

  componentDidMount() {
    axios.get('/spotify/saved/albums').then(albums => {
      this.setState({
        albums: albums.data.data.items,
        
      })
    })
  }

  render() {
    return (
      <div >
        <h1>Albums</h1>
        <div>
          <input placeholder='Filter'
            className='filterInput'
            onChange={e => this.setState({searchInput: e.target.value})}
          />
        </div>
        <div className='flexRowWrap'>
          {this.state.albums.filter(albumF => {
            return albumF.album.name.toLowerCase().includes(this.state.searchInput.toLowerCase())
          }).map(album => {
            return (
              <div key={album.album.id} className='album'>
                <Link to={`/dashboard/album/${album.album.id}`}><img src={album.album.images[1].url} /></Link>
                <p style={{ fontWeight: 'bold', color: 'white' }}>{album.album.name}</p>
                <p>{album.album.artists[0].name}</p>
              </div>
            )

          })}
        </div>
      </div>
    )
  }
}
