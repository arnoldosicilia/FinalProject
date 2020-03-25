import React, { Component } from 'react';
import './App.css';

import { Switch, Route, Redirect } from 'react-router-dom'


import Navbar from './components/ui/Navbar'
import Homepage from './components/pages/homepage/Homepage'
import Landing from './components/pages/landing/Landing'

import Signup from './components/pages/signup/Signup'
import Login from './components/pages/login/Login'
import Profile from './components/pages/profile/Profile'

import OfferDetails from './components/pages/offerDetails/OfferDetails'
import EditingOffer from './components/pages/offerDetails/EditingOffer'


import AuthServices from './services/auth.services'


class App extends Component {
  constructor() {
    super()
    this.state = { loggedInUser: false }
    this.services = new AuthServices()

  }

  componentDidMount = () => this.fetchUser()


  setTheUser = userObj => this.setState({ loggedInUser: userObj })

  fetchUser = () => {
    this.services.loggedin()
      .then(theUser => this.setState({ loggedInUser: theUser }))
      .catch(() => this.setState({ loggedInUser: false }))
  }


  render() {


    return (
      <>
        <Navbar setTheUser={this.setTheUser} loggedInUser={this.state.loggedInUser} />
        <Switch>
          <Route exact path="/" render={() => this.state.loggedInUser ? <Profile loggedInUser={this.state.loggedInUser} /> : <Redirect to="/" />} />
          {/* <Route exact path="/" render={() => <Landing loggedInUser={this.state.loggedInUser} />} /> */}
          <Route path="/homepage" render={() => <Homepage loggedInUser={this.state.loggedInUser} />} />
          <Route path="/signup" render={props => <Signup setTheUser={this.setTheUser} {...props} />} />
          <Route path="/login" render={props => <Login setTheUser={this.setTheUser} {...props} />} />
          <Route path="/profile" render={() => this.state.loggedInUser ? <Profile loggedInUser={this.state.loggedInUser} /> : <Redirect to="/" />} />
          <Route path="/offerDetails/:_id" render={props => <OfferDetails {...props} loggedInUser={this.state.loggedInUser} />} />
          <Route path="/edit/:_id" render={match => <EditingOffer  {...match} loggedInUser={this.state.loggedInUser} />} />
        </Switch>
      </>
    );
  }
}

export default App;
