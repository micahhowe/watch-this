import React, {Component} from 'react'
//import {Link} from 'react-router-dom'
import '../../App.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortDown } from '@fortawesome/free-solid-svg-icons'
import { faSortUp } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'


export default class Flix extends Component {
    constructor(props) {
        super(props)
    this.state = {
        title: '',
        image: '',
        info:'',
        editFlix : false
        }
        this.updateFlix = this.updateFlix.bind(this)

    }
  toggleEdit() {
    this.setState({ editFlix: !this.state.editFlix })
  }
  handleChange(e, key) {
    this.setState({
      [key]: e.target.value
    })
  }
  updateFlix(id) {
    const {title: flix_title, image: flix_image, info: flix_info} = this.state
    axios.put(`/api/flix/${id}`, {flix_title, flix_info, flix_image}).then(res => {
        this.props.findFlix()
        this.toggleEdit()
    })
    .catch(err => {
      alert('Sorry! Try Updating again.')
    })
    
  
}
  
  render() {
      //console.log(this.props)
      let { editFlix } = this.state
      const editStyle = this.state.editFlix ? {} : {display: 'none'}
    return (
    <div className="Flix">
        <div className="single-flix">
            <div className="flix-top-level">
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
                <p>{this.props.info}</p>
            </div>
            <div className="flix-buttons">
            <div className="edit-button">
                {/* This 'change' has been destructured right after the render above */}
                {editFlix ? (
        null
        ) : (
          <button id="single-edit-button" onClick={() => this.toggleEdit()}>Edit</button>
        )}
                   
                 </div>
                <button onClick={() => this.props.deleteFlix(this.props.id)}>Remove</button>
            </div>
            <div className="flix-arrows">
            <FontAwesomeIcon icon={faSortUp} size="3x"/>
            <h6>{this.props.priority}</h6>
            <FontAwesomeIcon icon={faSortDown} size="3x"/>
            </div>
            {/* Add a big div for everything above */}
            </div>
            <div className="edit-flix-form" style={editStyle}>
        <input 
        type="text" 
        onChange={e => this.handleChange(e, 'title')}
        placeholder="New Flix Title"
        />
        
        <input type="text" 
        onChange={e => this.handleChange(e, 'info')}
        placeholder="New Flix Info"
        />

        <input type="text" 
        onChange={e => this.handleChange(e, 'image')}
        placeholder="New Image URL"
        />
        <img style={{maxHeight:100}} src={this.state.image} alt='' />
        {/* End of the add flix section */}
        <button id="save-button" onClick={() => this.updateFlix(this.props.id)}>Save</button>
        <button id="cancel-button" onClick={() => this.toggleEdit()}>Cancel</button>
      </div> 
           
        </div>
        
    </div>
    )
  }
}
