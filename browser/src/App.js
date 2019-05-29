import React, { Component} from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.scss';
import Footer from './components/footer';
import Header from './components/header';
import {LoginPageContainer} from './components/login';
import Protected from './components/creationPage';
import LandingPage from './components/landingPage';

class App extends Component {

  render() {
      return (

        <BrowserRouter>
          <Header />
          <Route exact path="/" component={LandingPage} />
          <Route path="/login" component={LoginPageContainer} />
          <Route path="/creationPage" component={Protected} />
          <Footer />
        </BrowserRouter>
    );
  }
}

export default App;
