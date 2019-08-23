
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
      hideEditorPick: true,
      toggleDark: false
    }
    this.deleteFlix = this.deleteFlix.bind(this)
    this.handleHidden = this.handleHidden.bind(this)
    this.toggleDark = this.toggleDark.bind(this)
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
    
    const { title: flix_title, image: flix_image, info: flix_info } = this.state
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
      image: 'https://d13ezvd6yrslxm.cloudfront.net/wp/wp-content/images/Westworld-season-2-images-700x300.jpg',
      info: 'Streaming on HBO'
    })
    this.createFlix()
  }
  addStranger = async () => {
    await this.setState({
      title: 'Stranger Things',
      image: 'https://cdn.vox-cdn.com/thumbor/BbCaCZKm1rjdMHuI2YM96VS8l9s=/0x0:4400x2200/1200x800/filters:focal(1703x505:2407x1209)/cdn.vox-cdn.com/uploads/chorus_image/image/64695953/ST3_Production_Still_4.0.jpg',
      info: 'Streaming on Netflix'
    })
    this.createFlix()
  }
  addLost = async () => {
    await this.setState({
      title: 'Lost',
      image: 'https://vignette.wikia.nocookie.net/lostpedia/images/6/69/Lost_cast.jpg/revision/latest?cb=20060514183120',
      info: 'Available on Hulu'
    })
    this.createFlix()
  }

  handleHidden = () => {
    this.setState({
      hideEditorPick: !this.state.hideEditorPick
    })
  }
  toggleDark = () => {
    this.setState({
      toggleDark: !this.state.toggleDark
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
    const colorMode = this.state.toggleDark ? {
      backgroundColor:'black',
      color:'white'
    } : {
      backgroundColor:'white',
      color:'black'
    }
    const bottomStyling = {padding: '0 0 30px 0', color:'rgba(0,0,0,.2)'}
    return (
      <div className='Dashboard' style={colorMode}>
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
              <img src="https://d13ezvd6yrslxm.cloudfront.net/wp/wp-content/images/Westworld-season-2-images-700x300.jpg" alt="westworld characters" />
              <div className="editor-content">
              <p>
                Westworld
              </p>
              <button>Add</button>
              </div>
              
            </div>
            <div className="add-stranger" onClick={() => this.addStranger()}>
            <img src="https://cdn.vox-cdn.com/thumbor/BbCaCZKm1rjdMHuI2YM96VS8l9s=/0x0:4400x2200/1200x800/filters:focal(1703x505:2407x1209)/cdn.vox-cdn.com/uploads/chorus_image/image/64695953/ST3_Production_Still_4.0.jpg" alt="stranger things characters" />
            <div className="editor-content">
              <p>
                Stranger Things
              </p>
              <button>Add</button>
              </div>
            </div>
            <div className="add-lost" onClick={() => this.addLost()}>
            <img src="https://vignette.wikia.nocookie.net/lostpedia/images/6/69/Lost_cast.jpg/revision/latest?cb=20060514183120" alt="lost characters" />
            <div className="editor-content">
              <p>
                Lost
              </p>
              <button>Add</button>
              </div>
            </div>
          </div>
        </div>
        <div className="all-flix">
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
        <p style={bottomStyling} onClick={() => this.toggleDark()}>☽</p>
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
