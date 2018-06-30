import React, { Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom'

export default class NewRealeses extends Component {
  constructor() {
    super()
    this.state = {
      newReleases: []
    }
  }

  componentDidMount() {
    axios.get('/spotify/browse/newReleases').then(res => {
      console.log(res)
      this.setState({
        newReleases: res.data.body.albums.items
      })
    })
  }
  render() {
    console.log(this.state.newReleases)
    return (
      <div className='flexRowWrap'>
        {this.state.newReleases.map(album => {
          return (
            <Link to={`/dashboard/album/${album.id}`} key={album.id} ><div>
              <img src={album.images[1].url} alt='album'/>
              <p>{album.name}</p>
            </div></Link>
          )
        })}
      </div>
    )
  }
}
