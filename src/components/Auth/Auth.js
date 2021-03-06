import React, { Component } from 'react'
import axios from 'axios'
import { setUser } from '../../ducks/reducer'
import { connect } from 'react-redux'
import '../../App.scss'
import {Link} from 'react-router-dom'
import Swal from 'sweetalert2'



class Auth extends Component {
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

  login = () => {
    const {emailInput: email, passwordInput: password} = this.state
    axios.post('/auth/login', {email, password}).then(res => {
      const {username, email} = res.data.user
      this.props.setUser({username, email})
      this.props.history.push('/dashboard')
    })
    .catch(err => {
      Swal.fire({
        type: 'error',
        title: 'Oops...',
        text: 'Login Failed!'
      })
    })
  }
  
  render() {
    return (
      <div className="Auth">
        
        <div className="login-page">
          <div className="inputs-container">
            <div className="Logo">
            Watch This
            </div>
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
                <div className="auth-link">
                
                    <button onClick={this.login}>Sign In</button>
                    or <Link to="/register">Create an account</Link>
                </div>
                
            </div>
        </div>
    </div>
      
    )
  }
}


export default connect(
    null,
  { setUser }
)(Auth)
