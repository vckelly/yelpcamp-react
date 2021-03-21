import React, { Component } from 'react'

export default class Campground extends Component {
  render(campground) {
    console.log(campground)
    return (
      <div >
        <h3>{campground}</h3>
      </div>
    )
  }
}
