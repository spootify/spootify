import React, { Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class Charts extends Component {
  constructor() {
    super()
    this.state = {
      globalTop: {},
      usaTop: {},
      viralGlobTop: {},
      viralUsaTop: {},
      topLists: []
    }
  }

  componentDidMount() {
    axios.get(`/spotify/category/toplists`).then(topLists => {
      this.setState({
        topLists: topLists.data.body.playlists.items
      })
    })
  }
  render() {
    console.log(this.state)
    return (
      <div className='flexRow spaceEvenly'>
        {this.state.topLists.filter((playlist, i) => {
          return playlist.name === "United States Top 50"
            || playlist.name === "Global Top 50"
            || playlist.name === "Global Viral 50"
            || playlist.name === "United States Viral 50"
        }).map((playList, i) => {
          return (
            <Link to={`/dashboard/playlist/${playList.owner.id}/${playList.id}`}>
              <div>
                <img src={playList.images[0].url} />
                <p>{playList.name}</p>
              </div>
            </Link>
          )
        })}
      </div>
    )
  }
}
