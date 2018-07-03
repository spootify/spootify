import React, { Component } from 'react'

export default class Artists extends Component {
  constructor(){
    super()
    this.state = {
      artists: []
    }
  }

  render() {
    return (
      <div>
        Artists
      </div>
    )
  }
}
