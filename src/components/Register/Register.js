import React, { Component } from 'react'
import axios from 'axios'
import { setUser } from '../../ducks/reducer'
import { connect } from 'react-redux'
import '../Auth/Auth.css'


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
  login = () => {
    const {emailInput: email, passwordInput: password} = this.state
    axios.post('/auth/login', {email, password}).then(res => {
      const {username, email} = res.data.user
      this.props.setUser({username, email})
      this.props.history.push('/dashboard')
    })
    .catch(err => {
      alert('Sorry! Try again.')
    })
  }
  render() {
      console.log(this.state.passwordInput)
    return (
      <div className="Register">
         <div className="back-button" onClick={() => this.props.history.push('/')}>
          <img src="http://pngriver.com/wp-content/uploads/2018/04/Download-Back-Arrow-Png-Image-67338-For-Designing-Projects.png" />
          </div>
        <div className="login-page">
            
          <div className="inputs-container">
            <div className="Logo">
            W@tch This
            </div>
            <input
              onChange={e => this.handleChange(e, 'usernameInput')}
              type="text"
              placeholder="Username"
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
