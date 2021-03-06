import React, { Component } from 'react'
//import {Link} from 'react-router-dom'
import { connect } from 'react-redux'
import axios from 'axios'
import { setUser } from '../../ducks/reducer'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import StripeCheckout from 'react-stripe-checkout'
import Swal from 'sweetalert2'


class Donation extends Component {
  constructor() {
    super()
    this.state = {
      amount: 0
    }
    this.checkSession = this.checkSession.bind(this)

  }

  onToken = async (token) => {
    let { amount } = this.state
    amount /= 100
    
    token.card = void 0
    axios.post('/api/payment', { token, amount: this.state.amount }).then(res => {
      Swal.fire(
        'Thanks!',
        `You paid the Developers of Watch This $${amount}!`,
        'success'
      )
      // alert(`Congratulations you paid the Developers of Watch This $${amount}!`)
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
    let buttonSpacing = {margin: '0 2% 0 0'}
    return (
      <div className='Donation' >
        <div className="back-button" onClick={() => this.props.history.push('/dashboard')}>
          <FontAwesomeIcon icon={faArrowLeft} size="4x" />
        </div>
        Please show your support for the developer by making a donation!
        <div className="stripe-elements">
          
          <div className="099" onClick={e => this.setState({amount: +99})}>
          <StripeCheckout
          name={`Support Watch This`} //header
          image={imageUrl}
          description='Thanks for making a donation!' //subtitle - beneath header
          stripeKey={process.env.REACT_APP_STRIPE_KEY}
          token={this.onToken} //fires the call back
          amount={99} //this will be in cents
          currency="USD"
          panelLabel="Submit Donation" //text on the submit button
          locale="en"
          allowRememberMe
          billingAddress={false}
          zipCode={false}
          label="$0.99"
          style={buttonSpacing}
          /></div>
          <div className="499" onClick={e => this.setState({amount: +499})}>
          <StripeCheckout
          name={`Support Watch This`} //header
          image={imageUrl}
          description='Thanks for making a donation!' //subtitle - beneath header
          stripeKey={process.env.REACT_APP_STRIPE_KEY}
          token={this.onToken} //fires the call back
          amount={'499'} //this will be in cents
          currency="USD"
          panelLabel="Submit Donation" //text on the submit button
          locale="en"
          allowRememberMe
          billingAddress={false}
          zipCode={false}
          label="$4.99"
          style={buttonSpacing}
          /></div>
          <div className="999" onClick={e => this.setState({amount: +999})}>
          <StripeCheckout
          name={`Support Watch This`} //header
          image={imageUrl}
          description='Thanks for making a donation!' //subtitle - beneath header
          stripeKey={process.env.REACT_APP_STRIPE_KEY}
          token={this.onToken} //fires the call back
          amount={'999'} //this will be in cents
          currency="USD"
          panelLabel="Submit Donation" //text on the submit button
          locale="en"
          allowRememberMe
          billingAddress={false}
          zipCode={false}
          label="$9.99"
          /></div>
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
const imageUrl = 'https://www.computerhope.com/jargon/d/dollarsign.jpg'
