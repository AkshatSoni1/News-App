import React, { Component } from 'react'
import loading from '.././MagnifyLoading.gif'
export default class Spinner extends Component {
  render() {
    return (
      <div style={{display:"flex",justifyContent:"center"}}>
        <img className="my-3"src={loading} alt="loading.."></img>
      </div>
    )
  }
}
