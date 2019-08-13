import React, {Component} from 'react'
import {Link} from 'react-router-dom'





export default class Dashboard extends Component {
  state = {
    
  }
  handleChange = (prop, e) => {
    this.setState({[prop]: e.target.value})
  }
  render() {
    return (
      <div className='Dashboard'>
       Dashboard
       <div className="donate-button">
       <img onClick={() => this.props.history.push('/donate')} src="https://www.stickpng.com/assets/thumbs/5895ce81cba9841eabab606b.png"/>
       </div>
      </div>
    )
  }
}
