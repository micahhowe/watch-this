
import React, { Component } from 'react'
//import {Link} from 'react-router-dom'
import { connect } from 'react-redux'
import axios from 'axios'
import { setUser } from '../../ducks/reducer'
import Flix from '../Flix/Flix.js'
import '../../App.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortDown } from '@fortawesome/free-solid-svg-icons'
import { faDonate } from '@fortawesome/free-solid-svg-icons'



class Dashboard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      title: '',
      image: '',
      info: '',
      flixList: [],
      hideEditorPick: true
    }
    this.deleteFlix = this.deleteFlix.bind(this)
    this.handleHidden = this.handleHidden.bind(this)
  }
  handleChange(e, key) {
    this.setState({
      [key]: e.target.value
    })
  }
  findFlix = () => {
    axios.get(`/api/flix`).then(flixList =>
      this.setState({
        flixList: flixList.data
      }))
  }
  createFlix = () => {
    console.log('State:', this.state)
    const { title: flix_title, image: flix_image, info: flix_info } = this.state
    console.log(flix_title, flix_image, flix_info)
    axios.post('/api/flix', { flix_title, flix_image, flix_info }).then(res => {
      this.findFlix()
    })
      .catch(err => {
        alert('Sorry! Try Adding again.')
      })
    this.setState({
      title: '',
      image: '',
      info: ''
    })
  }
  addWestWorld = async () => {
    await this.setState({
      title: 'Westworld',
      image: '',
      info: 'HBO'
    })
    this.createFlix()
  }
  addStranger = async () => {
    await this.setState({
      title: 'Stranger Things',
      image: '',
      info: 'Netflix'
    })
    this.createFlix()
  }
  addLost = async () => {
    await this.setState({
      title: 'Lost',
      image: '',
      info: 'Hulu'
    })
    this.createFlix()
  }

  handleHidden = () => {
    this.setState({
      hideEditorPick: !this.state.hideEditorPick
    })
  }

  componentDidMount() {
    this.findFlix()
    this.checkSession()
  }
  checkSession() {
    axios.get(`/auth/me`).then(res =>
      this.props.setUser(res.data.user)
    )
  }
  deleteFlix(id) {
    axios.delete(`/api/flix/${id}`).then(res => {
      this.findFlix()
    }).catch(function () {
      console.log('Awww Jeez Rick ... could not delete flix');
    })
  }
  render() {
    const style = this.state.hideEditorPick ? { display: 'none' } : {}
    return (
      <div className='Dashboard'>
        <div className="add-flix-form">
          <input
            type="text"
            onChange={e => this.handleChange(e, 'title')}
            placeholder="Flix Title"
            value={this.state.title}
          />

          <input type="text"
            onChange={e => this.handleChange(e, 'info')}
            placeholder="Flix Info"
            value={this.state.info}
          />

          <input type="text"
            onChange={e => this.handleChange(e, 'image')}
            placeholder="Image URL"
            value={this.state.image}
          />
          {this.state.image.length > 7 ? (
            <>
              <img style={{ maxHeight: 200 }} src={this.state.image} alt='' />
            </>
          ) : null}
          {/* End of the add flix section */}

          <button id="add-flix-button" onClick={() => this.createFlix()}>Add Flix</button>
        </div>
        <div className="editors-picks">
          <div className="editors-picks-button" onClick={() => this.handleHidden()}>
            <span id="editor-text">Editors' Picks</span>
            <FontAwesomeIcon icon={faSortDown} size="1x" />
          </div>

          <div id="my-picks" style={style}>
            <div className="add-westworld" onClick={() => this.addWestWorld()}>
              <p>
                Westworld
              </p>
            </div>
            <div className="add-stranger" onClick={() => this.addStranger()}>
              <p>
                Stranger Things
              </p>
            </div>
            <div className="add-Lost" onClick={() => this.addLost()}>
              <p>
                Lost
              </p>
            </div>
          </div>
        </div>
        <div>
          {/* {this.state.flixList.map(el => (
                        <Flix
                        key={el.flix_id}
                        id={el.flix_id}
                        title={el.flix_title}
                        image={el.flix_image}
                        info={el.flix_info}
                        deleteFlix={this.deleteFlix}
                        />
          ))}  */}
          {this.state.flixList.filter(el => (el.username === this.props.username)).map((el, i) => (
            <div>
              <Flix
                key={el.flix_id}
                id={el.flix_id}
                title={el.flix_title}
                image={el.flix_image}
                info={el.flix_info}
                priority={el.flix_priority}
                deleteFlix={this.deleteFlix}
                findFlix={this.findFlix}
              />
            </div>
          ))}
        </div>
        <div className="donate-button">
          <FontAwesomeIcon icon={faDonate} size="3x" onClick={() => this.props.history.push('/donate')} />
        </div>
      </div>
    )
  }
}
function mapStateToProps(reduxState) {
  const { user, username } = reduxState
  return { user, username }
}

export default connect(
  mapStateToProps,
  { setUser }
)(Dashboard)
