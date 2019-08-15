import React, {Component} from 'react'
//import {Link} from 'react-router-dom'
import { connect } from 'react-redux'
import axios from 'axios'
import { setUser } from '../../ducks/reducer'
import Flix from '../Flix/Flix.js'
import '../../App.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortDown } from '@fortawesome/free-solid-svg-icons'



class Dashboard extends Component {
    constructor(props) {
        super(props)

        this.state = {
            title: '',
            image: '',
            info:'',
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
            const {title: flix_title, image: flix_image, info: flix_info} = this.state
            axios.post('/api/flix', {flix_title, flix_image, flix_info}).then(res => {
                this.findFlix()
            })
            .catch(err => {
              alert('Sorry! Try Adding again.')
            })
            
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
          checkSession(){
            axios.get(`/auth/me`).then(res => 
                this.props.setUser( res.data.user )
            )}
            deleteFlix(id){
                axios.delete(`/api/flix/${id}`).then(res => {
                    this.findFlix()
                  }).catch(function() {
                    console.log('Awww Jeez Rick ... could not delete flix');
                  })
            }
  render() {
    const style = this.state.hideEditorPick ? {display: 'none'} : {}
    return (
      <div className='Dashboard'>
       <div className="add-flix-form">
        <input 
        type="text" 
        onChange={e => this.handleChange(e, 'title')}
        placeholder="Flix Title"
        />
        
        <input type="text" 
        onChange={e => this.handleChange(e, 'info')}
        placeholder="Flix Info"
        />

        <input type="text" 
        onChange={e => this.handleChange(e, 'image')}
        placeholder="Image URL"
        />
        <img style={{maxHeight:200}} src={this.state.image} alt='' />
        {/* End of the add flix section */}
        <button id="add-flix-button" onClick={() => this.createFlix()}>Add Flix</button>
      </div> 
      <div className="editors-picks">
          <div className="editors-picks-button" onClick={() => this.handleHidden()}>
             <span id="editor-text">Editors' Picks</span>
            <FontAwesomeIcon icon={faSortDown} size="1x"/>
          </div>

            <div id="my-picks" style={style}>
             (_) (_) (_)
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
        {this.state.flixList.filter(el => ( el.username === this.props.username)).map((el, i) => (
                        <div>
                        <Flix
                        key={el.flix_id}
                        id={el.flix_id}
                        title={el.flix_title}
                        image={el.flix_image}
                        info={el.flix_info}
                        priority={el.flix_priority}
                        deleteFlix={this.deleteFlix}
                        />    
                        </div>
                    )) }
      </div>
       <div className="donate-button">
            <img onClick={() => this.props.history.push('/donate')} src="https://www.stickpng.com/assets/thumbs/5895ce81cba9841eabab606b.png" alt="Donate Button"/>
       </div>
    </div>
    )
  }
}
function mapStateToProps(reduxState) {
    const { user, username } = reduxState
    return { user, username}
  }

  export default connect(
    mapStateToProps,
    { setUser }
  )(Dashboard)
