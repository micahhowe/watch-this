import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Auth from './components/Auth/Auth'
import Dashboard from './components/Dashboard/Dashboard'
import Donation from './components/Donation/Donation'

export default (
    <Switch>
        <Route path='/' exact component={Auth} />
        <Route path='/dashboard'  component={Dashboard} />
        <Route path='/donate'  component={Donation} />
    </Switch>
)