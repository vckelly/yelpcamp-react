import React, { Component } from 'react'

export default class Campground extends Component {
  render(campground) {
    return (
      <div >
        <h3>{campground.name}</h3>
      </div>
    )
  }
}
