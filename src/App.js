import React, {Component} from 'react';
import './App.scss';
import Nav from './components/Nav/Nav'
import routes from './routes'
import { withRouter } from 'react-router-dom'




class App extends Component {
  render(){
    return (
      <div className="App">
        {/* {this.props.location.pathname === "/" ? null : <Nav />} */}
        {/* This is a double ternary checking for both Login and Register Pages */}
        {this.props.location.pathname === "/" ? null : this.props.location.pathname === "/register" ? null : <Nav />}
        {routes}
      </div>
    );
  }
}

export default withRouter(App);
