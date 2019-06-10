import React, { Component} from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.scss';
import Footer from './components/footer';
import Header from './components/header';
import {LoginPageContainer} from './components/login';
import Protected from './components/creationPage';
import LandingPage from './components/landingPage';
import {ContactCotainer} from './components/contact'


  render() {
      return (

        <BrowserRouter>
          <Header />
          <Route exact path="/" component={LandingPage} />
          <Route path="/login" component={LoginPageContainer} />
          <Route path="/creationPage" component={Protected} />
          <Route path="/contact" component={ContactCotainer} />
          <Footer />
        </BrowserRouter>
    );
  }
}

export default App;
