import React, {Component} from 'react'
//import {Link} from 'react-router-dom'

export default class Donation extends Component {
  state = {
    
  }
  handleChange = (prop, e) => {
    this.setState({[prop]: e.target.value})
  }
  render() {
    return (
      <div className='Donation'>
       Donation
      </div>
    )
  }
}
