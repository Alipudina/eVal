import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import './App.scss';
import Footer from './components/footer';
import Header from './components/header';
import { LoginPageContainer } from './components/login';
import { Protected } from './components/creationPage';
import LandingPage from './components/landingPage';
import { ContactContainer } from './components/contact';
// import {CreationPageContainer} from './components/creationPage';
import { EmailSendContainer } from './components/emailsend';
import { ShowTestContainer } from './components/showtest';


class App extends Component {

  render() {
    return (
      <React.Fragment>
        <BrowserRouter>

          <Header />
          <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/login" component={LoginPageContainer} />
          <Route path="/create" component={Protected} />
          <Route path="/contact" component={ContactContainer} />
          <Route path="/emailsend" component={EmailSendContainer} />

            <Route path="/showtest" component={ShowTestContainer} />

          {document.cookie && <Redirect to="/showtest"/>}
          </Switch>
          <Footer />
        </BrowserRouter>
      </React.Fragment>
    );
  }
}


export default App;
