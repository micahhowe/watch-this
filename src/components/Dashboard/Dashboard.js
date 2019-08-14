import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux'
import axios from 'axios'
import { setUser } from '../../ducks/reducer'


class Dashboard extends Component {
        state = {
            title: '',
            image: '',
            info:''
        }
        handleChange(e, key) {
            this.setState({
              [key]: e.target.value
            })
          }
          createFlix = () => {
            const {title: flix_title, image: flix_image, info: flix_content} = this.state
            axios.post('/api/flix', {flix_title, flix_image, flix_content}).then(res => {

            })
            .catch(err => {
              alert('Sorry! Try Adding again.')
            })
          }
          componentDidMount() {
            this.checkSession()
        }
          checkSession(){
            axios.get(`/auth/me`).then(res => 
                this.props.setUser( res.data.user )
            )}
  render() {
    return (
      <div className='Dashboard'>
       <div className="donate-button">
       <img onClick={() => this.props.history.push('/donate')} src="https://www.stickpng.com/assets/thumbs/5895ce81cba9841eabab606b.png" alt="Donate Button"/>
       </div>
       <div className="add-flix-form">
        <input 
        type="text" 
        onChange={e => this.handleChange(e, 'title')}
        placeholder="Flix Title"
        />
        
        <input type="text" 
        onChange={e => this.handleChange(e, 'info')}
        placeholder="Flix info"
        />

        <input type="text" 
        onChange={e => this.handleChange(e, 'image')}
        placeholder="Image URL"
        />
        <img src={this.state.image} alt='' />
        <Link to="/dashboard">
        <button onClick={() => this.createFlix()}>Add Flix</button>
        </Link>
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
