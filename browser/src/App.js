import React, { Component } from 'react';
import {BrowserRouter} from 'react-router-dom';
import './App.scss';
import CssBaseline from '@material-ui/core/CssBaseline';
import Footer from './components/footer'
import Header from './components/header'
import Body from './components/body'


class App extends Component {
  render(){
    return (
      <React.Fragment>
        <CssBaseline />
        <BrowserRouter>
          <Header />
          <Body />
          <br></br>
          <Footer />
        </BrowserRouter>
      </React.Fragment>
    )
  }
}

export default App;
