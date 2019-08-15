import React, {Component} from 'react'
//import {Link} from 'react-router-dom'
import { connect } from 'react-redux'
import axios from 'axios'
import { setUser } from '../../ducks/reducer'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

class Donation extends Component {
  state = {
    
  }
  componentDidMount() {
    this.checkSession()
    }
  checkSession(){
    axios.get(`/auth/me`).then(res => 
        this.props.setUser( res.data.user )
    )}
  handleChange = (prop, e) => {
    this.setState({[prop]: e.target.value})
  }
  render() {
    return (
      <div className='Donation' >
          <div className="back-button" onClick={() => this.props.history.push('/dashboard')}>
          <FontAwesomeIcon icon={faArrowLeft} size="4x" />
            
          {/* <img src="http://pngriver.com/wp-content/uploads/2018/04/Download-Back-Arrow-Png-Image-67338-For-Designing-Projects.png" alt="back button" /> */}
          </div>
       <span style={{border: "1px solid black", padding: "50px"}}>Stripe Box</span>
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
  )(Donation)
