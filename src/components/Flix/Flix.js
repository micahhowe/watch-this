import React, {Component} from 'react'
//import {Link} from 'react-router-dom'
import '../../App.scss'


export default class Flix extends Component {
  state = {
    
  }
  handleChange = (prop, e) => {
    this.setState({[prop]: e.target.value})
  }
  render() {
      //console.log(this.props)
    return (
    <div className="Flix">
        <div className="single-flix">
            <div className="flix-content">
                <img className="flix-image" src={this.props.image} alt='this flix visual'/>
            </div>
            <div className="flix-header">
                <h4>
                {this.props.title}
                </h4>
                <span>{this.props.info}</span>
            </div>
            <button>Edit</button>
            <button onClick={() => this.props.deleteFlix(this.props.id)}>Delete</button>
        </div>
    </div>
    )
  }
}
