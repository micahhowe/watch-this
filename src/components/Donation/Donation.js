import React, { Component } from 'react'
//import {Link} from 'react-router-dom'
import { connect } from 'react-redux'
import axios from 'axios'
import { setUser } from '../../ducks/reducer'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import StripeCheckout from 'react-stripe-checkout'

class Donation extends Component {
  constructor() {
    super()
    this.state = {
      amount: 0
    }
    this.checkSession = this.checkSession.bind(this)

  }

  onOpened = () => {
    console.log('this is opened')
  }

  onClosed = () => {
    console.log('this is closed')
  }

  onToken = (token) => {
    let { amount } = this.state
    amount /= 100
    
    token.card = void 0
    axios.post('/api/payment', { token, amount: this.state.amount }).then(res => {
      alert(`Congratulations you paid the Developers of Watch This $${amount}!`)
      //send it back to dashboard
    })
    this.props.history.push('/dashboard')
  }


  componentDidMount() {
    this.checkSession()
  }
  checkSession() {
    axios.get(`/auth/me`).then(res =>
      this.props.setUser(res.data.user)
    )
  }
  handleChange = (prop, e) => {
    this.setState({ [prop]: e.target.value })
  }
  render() {
    return (
      <div className='Donation' >
        <div className="back-button" onClick={() => this.props.history.push('/dashboard')}>
          <FontAwesomeIcon icon={faArrowLeft} size="4x" />

        </div>
        <div className="stripe-elements">
          <p>Please enter Donation amount in cents! Every cent counts ;) </p>
        <input value={this.state.amount}
            type='number'
            onChange={e => this.setState({ amount: +e.target.value })}
          />
          <StripeCheckout
            name={`Support Watch This`} //header
            image={imageUrl}
            description='Thanks for making a donation!' //subtitle - beneath header
            stripeKey={process.env.REACT_APP_STRIPE_KEY}
            token={this.onToken} //fires the call back
            amount={this.state.amount} //this will be in cents
            currency="USD"
            panelLabel="Submit Donation" //text on the submit button
            locale="en"
            opened={this.onOpened} //fires cb when stripe is opened
            closed={this.onClosed} //fires cb when stripe is closed
            allowRememberMe
            billingAddress={false}
            zipCode={false}
            label="Make Donation"
          />
          
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
)(Donation)
const imageUrl = 'https://cdn.pixabay.com/photo/2014/10/23/10/10/dollar-499481_960_720.jpg'
