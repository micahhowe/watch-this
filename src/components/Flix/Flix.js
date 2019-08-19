import React, { Component } from 'react'
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
      info: '',
      editFlix: false,
      flixPriority: props.priority
    }
    this.updateFlix = this.updateFlix.bind(this)
    this.increasePriority = this.increasePriority.bind(this)
    this.decreasePriority = this.decreasePriority.bind(this)
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
    const { title: flix_title, image: flix_image, info: flix_info } = this.state
    axios.put(`/api/flix/${id}`, { flix_title, flix_info, flix_image }).then(res => {
      this.props.findFlix()
      this.toggleEdit()
    })
      .catch(err => {
        alert('Sorry! Try Updating again.')
      })
    this.setState({
      title: '',
      image: '',
      info: ''
    })
  }
  increasePriority(id) {
    let { flixPriority: flix_priority } = this.state
      axios.put(`/api/flix/uparrows/${id}`, { flix_priority }).then(res => {
        this.props.findFlix()
      })
        .catch(err => {
          alert('Sorry! Try increasing again.')
        })

    
  }
  decreasePriority(id) {
    let { flixPriority: flix_priority } = this.state

    axios.put(`/api/flix/downarrows/${id}`, { flix_priority }).then(res => {
      this.props.findFlix()
      // this.toggleEdit()
      this.setState({
        flixPriority: this.state.flix_priority - 1
      })
    })
      .catch(err => {
        alert('Sorry! Try decreasing again.')
      })
  }



  render() {
    //console.log(this.props)
    let { editFlix } = this.state
    const editStyle = this.state.editFlix ? {} : { display: 'none' }
    return (
      <div className="Flix">
        <div className="single-flix">
          <div className="flix-top-level">
            <div className="flix-content">
              <img className="flix-image" src={this.props.image} alt='this flix visual' />
            </div>

            <div className="flix-info">
              <div className="top-info">
                <div className="flix-title">
                  <h3>
                    {this.props.title}
                  </h3>
                </div>
                {/* <div className="streaming-selection">
                        <select>
                            <option value=""></option>
                            <option value="netflix">Netflix</option>
                            <option value="hbo">HBO</option>
                            <option value="prime-video">Prime Video</option>
                            <option value="hulu">Hulu</option>
                        </select>
                    </div> */}
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
              <FontAwesomeIcon onClick={this.props.priority <= 9 ? () => this.increasePriority(this.props.id) : null} icon={faSortUp} size="3x" />
              <p style={this.props.priority >= 8 ? {textShadow : '2px 2px lightgreen'} : this.props.priority >= 4 ? {textShadow:'2px 2px yellow'}:{textShadow:'1px 1px red'}}>{this.props.priority * 10}% </p>
              <FontAwesomeIcon onClick={this.props.priority > 0 ? () => this.decreasePriority(this.props.id) : null } icon={faSortDown} size="3x" />
            </div>
            {/* Add a big div for everything above */}
          </div>
          <div className="edit-flix-form" style={editStyle}>
            <input
              type="text"
              onChange={e => this.handleChange(e, 'title')}
              placeholder="New Title"
              value={this.state.title}
            />

            <input type="text"
              onChange={e => this.handleChange(e, 'info')}
              placeholder="New Info"
              value={this.state.info}
            />

            <input type="text"
              onChange={e => this.handleChange(e, 'image')}
              placeholder="New URL"
              value={this.state.image}
            />
            {this.state.image.length > 7 ? (
              <>
                <img style={{ maxHeight: 200 }} src={this.state.image} alt='' />
              </>
            ) : null}
            {/* ^^^ this is the solution to the get /whatevertheinput value bug is */}
            {/* End of the add flix section */}
            <button id="save-button" onClick={() => this.updateFlix(this.props.id)}>Save</button>
            <button id="cancel-button" onClick={() => this.toggleEdit()}>Cancel</button>
          </div>

        </div>

      </div>
    )
  }
}
