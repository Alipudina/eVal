import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import LandingPage from './landingPage';
import LoginPage from './login';
import {CreationPageContainer, ShowTestContainer} from './creationPage';

export default class Body extends Component {
  render() {
    return (
      <>
        <div className="body">
          <Route path="/" exact component={LandingPage} />

          <Route path="/create" exact component={CreationPageContainer} />
          <Route path="/showtest" component={ShowTestContainer} />
        </div>
      </>
    )
  }
}
