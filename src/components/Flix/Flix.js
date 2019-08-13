import React, {Component} from 'react'
//import {Link} from 'react-router-dom'

export default class Flix extends Component {
  state = {
    
  }
  handleChange = (prop, e) => {
    this.setState({[prop]: e.target.value})
  }
  render() {
    return (
      <div className='Flix'>
       Flix
      </div>
    )
  }
}
