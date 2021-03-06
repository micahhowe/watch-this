import React, { Component } from 'react'
import axios from 'axios'
import { setUser } from '../../ducks/reducer'
import { connect } from 'react-redux'
import '../../App.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'




class Register extends Component {
  state = {
    usernameInput: '',
    emailInput: '',
    passwordInput: '',
  }
  handleChange(e, key) {
    this.setState({
      [key]: e.target.value
    })
  }
  registerUser = () => {
    const {
      usernameInput: username,
      emailInput: email,
      passwordInput: password,
    } = this.state
    axios
      .post('/auth/register', { username, email, password,})
      .then(res => {
        this.props.setUser({ username, email})
        this.props.history.push('/dashboard')
      })
      .catch(err => {
        alert('Email is already in use.')
      })
  }

  render() {
    return (
      <div className="Register">
         <div className="back-button" onClick={() => this.props.history.push('/')}>
         {/* <i class="fas fa-arrow-left"></i> */}
         <FontAwesomeIcon icon={faArrowLeft} size="4x" />
          {/* <img src="http://pngriver.com/wp-content/uploads/2018/04/Download-Back-Arrow-Png-Image-67338-For-Designing-Projects.png" alt="Back Button"/> */}
          </div>
        <div className="login-page">
            
          <div className="inputs-container">
            <div className="Logo">
            Watch This
            </div>
            <input
              onChange={e => this.handleChange(e, 'usernameInput')}
              type="text"
              placeholder="Desired Username"
            />
            <input
              onChange={e => this.handleChange(e, 'emailInput')}
              type="text"
              placeholder="Email"
            />
            <input
              onChange={e => this.handleChange(e, 'passwordInput')}
              type="password"
              placeholder="Password"
            />
            <div className="auth-buttons">
                <div className="register">
                    <button onClick={this.registerUser}>Register</button>
                </div>
                {/* <div className="login">
                    <button onClick={this.login}>Sign In</button>
                </div> */}

            </div>
          </div>
          <div>
          
    </div>
        </div>
      </div>
    )
  }
}


export default connect(
    null,
  { setUser }
)(Register)
