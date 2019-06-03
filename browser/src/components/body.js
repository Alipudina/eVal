import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import LandingPage from './landingPage';
import LoginPage from './login';
import {CreationPageContainer} from './creationPage';

export default class Body extends Component {
  render() {
    return (
      <>
        <div className="body">
          <Route path="/" exact component={LandingPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/create" component={CreationPageContainer} />
        </div>
      </>
    )
  }
}
