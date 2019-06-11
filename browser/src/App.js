import React, { Component} from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.scss';
import Footer from './components/footer';
import Header from './components/header';
import {LoginPageContainer} from './components/login';
import {Protected} from './components/creationPage';
import LandingPage from './components/landingPage';
import {ContactContainer} from './components/contact';
import {CreationPageContainer} from'./components/creationPage';

class App extends Component {
  render(){
    return (
      <React.Fragment>
        <BrowserRouter>
          <Header />
          <Route exact path="/" component={LandingPage} />
          <Route path="/login" component={LoginPageContainer} />
          <Route path="/create" component={Protected} />
          <Route path="/contact" component={ContactContainer} />
          <Footer />
        </BrowserRouter>
      </React.Fragment>
    );
  }
}


export default App;
