import React, {Component} from 'react'
//import {Link} from 'react-router-dom'
import '../../App.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortDown } from '@fortawesome/free-solid-svg-icons'
import { faSortUp } from '@fortawesome/free-solid-svg-icons'


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
            
            <div className="flix-info">
                <div className="top-info">
                    <div className="flix-title">
                        <h3>
                        {this.props.title}
                        </h3>
                    </div>
                    <div className="streaming-selection">
                        <select>
                            <option value=""></option>
                            <option value="netflix">Netflix</option>
                            <option value="hbo">HBO</option>
                            <option value="prime-video">Prime Video</option>
                            <option value="hulu">Hulu</option>
                        </select>
                    </div>
                </div>
                <span>{this.props.info}</span>
            </div>
            <div className="flix-buttons">
                <button>Edit</button>
                <button onClick={() => this.props.deleteFlix(this.props.id)}>Remove</button>
            </div>
            <div className="flix-arrows">
            <FontAwesomeIcon icon={faSortUp} size="3x"/>
            <h6>{this.props.priority}</h6>
            <FontAwesomeIcon icon={faSortDown} size="3x"/>
            </div>
        </div>
    </div>
    )
  }
}
