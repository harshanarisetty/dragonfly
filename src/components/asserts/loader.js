import React, { Component } from 'react'
import './loader.css';
import img from './vector.svg';
export default class Loader extends Component {
  render() {
    return (
      <div className='loder-main'>
        <img className='svg' src={img} alt='loader'/>
      </div>
    )
  }
}
