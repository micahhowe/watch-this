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
    <div className="Flix">
        <div className="single-flix">
            <div className="flix-header">
                <h4>
                {this.props.title}
                </h4>
            </div>
            <div className="flix-content">
                <img className="flix-image" src={this.props.image} alt='this flix visual'/>
                <span>{this.props.info}</span>
            </div>
        </div>
    </div>
    )
  }
}
