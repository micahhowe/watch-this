import React from 'react';
import './App.css';
import Auth from './components/Auth/Auth'
import Nav from './components/Nav/Nav'
import Dashboard from './components/Dashboard/Dashboard'
import Donation from './components/Donation/Donation'
import Flix from './components/Flix/Flix'



function App() {
  return (
    <div className="App">
      <Auth />
      <Nav />
      <Dashboard />
      <Donation />
      <Flix />
      
    </div>
  );
}

export default App;
