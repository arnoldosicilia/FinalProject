import React, { Component } from 'react';
import './App.css';

import { Switch, Route, Redirect } from 'react-router-dom'


import Navbar from './components/ui/Navbar'
import Homepage from './components/pages/Homepage'

import Signup from './components/pages/Signup'
import Login from './components/pages/Login'
import Profile from './components/pages/Profile'

import AuthServices from './services/auth.services'


class App extends Component {
  constructor() {
    super()
    this.state = { loggedInUser: false }
    this.services = new AuthServices()

  }

  setTheUser = userObj => this.setState({ loggedInUser: userObj })

  fetchUser = () => {
    this.services.loggedin()
      .then(theUser => this.setState({ loggedInUser: theUser }))
      .catch(() => this.setState({ loggedInUser: false }))
  }



  render() {

    return (
      <>
        <Navbar setTheUser={this.setTheUser} loggedInUser={this.state.loggedInUser} />/>

        <Switch>
          <Route exact path="/" render={() => <Homepage />} />
          <Route path="/signup" render={props => <Signup setTheUser={this.setTheUser} {...props} />} />
          <Route path="/login" render={props => <Login setTheUser={this.setTheUser} {...props} />} />
          <Route path="/profile" render={() => this.state.loggedInUser ? <Profile loggedInUser={this.state.loggedInUser} /> : <Redirect to="/" />} />
        </Switch>
      </>
    );
  }
}

export default App;
