import React, { Component } from 'react';
import './App.scss';

class App extends Component {

  render() {
    return (
      <div className="start-page">
        <div className="header">
          <div>Logo</div>
          <div className="login-container">
            <button>login</button>
            <button>Not a user</button>
          </div>
        </div>

        <div className="info-container">
          <p>
            eVAL is an easy, convenient and intuitive tool to create your own evaluation test.
            With eVAL you can create your own questions and choose the type of answer that best fits
            your needs: Yes/No, Multiple Choice or Scrambled Text.
            Store different set of tests to apply whenever you need.
            Send the link of a test to anyone, by e-mail, and receive the results once they’ve finished.
            eVAL, as simple as that!
          </p>
        </div>

        <div className="footer">
          <button>About US</button>
          <button>Info</button>
          <button>another buuton</button>
        </div>
      </div>
    );
  }
}

export default App;
