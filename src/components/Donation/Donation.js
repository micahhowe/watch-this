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
      <div className='Donation' >
          <div className="back-button" onClick={() => this.props.history.push('/dashboard')}>
          <img src="http://pngriver.com/wp-content/uploads/2018/04/Download-Back-Arrow-Png-Image-67338-For-Designing-Projects.png" />
          </div>
       <span style={{border: "1px solid black", padding: "50px"}}>Stripe Box</span>
      </div>
    )
  }
}
