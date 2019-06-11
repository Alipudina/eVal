import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class LandingPage extends Component {
    render() {
        return (
            <>
              <NavLink to="/login" className="btn btn-primary login-out">LogIn/SignUp</NavLink>
                <div className="landingPage">
                    <h1> LandingPage</h1>
                    <div className="info-container">
                        <p>
                            eVAL is an easy, convenient and intuitive tool to create your own evaluation test.
                            With eVAL you can create your own questions and choose the type of answer that best fits
                            your needs: Yes/No, Multiple Choice or Scrambled Text.             Store different set of tests to apply whenever you need.
                           Send the link of a test to anyone, by e-mail, and receive the results once they’ve finished.            eVAL, as simple as that!
                        </p>
                    </div>
                </div>

            </>
        )
    }
}
