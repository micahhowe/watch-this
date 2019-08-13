import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import { setUser } from '../../ducks/reducer'
import { logoutUser } from '../../ducks/reducer'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'


class Nav extends Component {
    logout = () => {
        axios.get('/auth/logout').then(() => {
          this.props.logoutUser()
          // This is what takes the user back to the dashboard upon logout
          this.props.history.push('/')
        })
      }
  render() {
      console.log(this.props)
      return (
      <div className="Nav">
         <h3 onClick={() => this.props.history.push('/dashboard')}>W@tch This</h3>
         {this.props.username ? (
          <>
          <h5>{this.props.username}</h5>
          </>
          ) : <h5>USERNAME</h5>}
         <h5 onClick={this.logout}>Logout</h5>
      </div>
    )
  }
}

function mapStateToProps(reduxState) {
    const { username } = reduxState
    return { username }
  }

export default connect(
    mapStateToProps,
    { logoutUser, setUser }
  )(withRouter(Nav))