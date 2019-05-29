import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Auth from '../auth';
import { connect } from 'react-redux';
import { redirectToLogin, loginInputHandler } from '../redux';


// loginPage ######################
class LoginPage extends Component {

  // signup part ++++++++++++++++++++++++
  signupHandler= ev => {
    ev.preventDefault();
    Auth.login();
    console.log(Auth.isAuthenticated());
  }

  // login part +++++++++++++++++++++++
  loginHandler= ev => {
    ev.preventDefault();
    this.props.redirectToLogin();
  }


  render() {
    return (
        <div className="login">

          <h1>login page</h1>
          <form className="loginForm" onSubmit={this.loginHandler}>
            <label>userName</label>
            <input type="text" placeholder="userName" required onChange={this.props.loginInputHandler} />
            <label>Password</label>
            <input type="password" placeholder="password" required onChange={this.props.loginInputHandler} />
            <button>Login</button>
          </form>
          {this.props.hasFailed && <div className="alert alert-danger my-4">Either username or password was incorrect. Try again!</div>}
          {this.props.loginRedirecion && <Redirect to="/creationPage"/>}

          <form className="createAccountForm" onSubmit={this.signupHandler}>
            <h1>Not a user ? Create account</h1>
            <label>Name</label>
            <input placeholder="Name" />
            <label>Email</label>
            <input placeholder="Email" />
            <label>userName</label>
            <input placeholder="userName" />
            <label>Password</label>
            <input placeholder="password" />
            <button>Signup</button>
          </form>
          {this.props.loginRedirecion && <Redirect to="/creationPage"/>}

        </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    loginRedirecion: state.loginRedirecion,
    hasFailed: state.hasFailed
  }
}

const mapDispatchToProps= dispatch => {
  return {
    redirectToLogin: ev => dispatch(redirectToLogin(ev)),
    loginInputHandler: ev => dispatch(loginInputHandler(ev))
  }
}

export const LoginPageContainer=connect(mapStateToProps, mapDispatchToProps)(LoginPage);
