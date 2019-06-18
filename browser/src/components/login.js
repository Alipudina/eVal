import React, { Component } from 'react';
import { Redirect, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { redirectToLogin, loginInputHandler, signinFetch, loginFetch, signinInputHandler } from '../redux';
import { Alert } from 'react-bootstrap';


// loginPage ######################
class LoginPage extends Component {

  // signup part ++++++++++++++++++++++++
  signupHandler = ev => {
    ev.preventDefault();

    this.props.addAccountHandler({
      userEmail: this.props.signinEmail,
      userName: this.props.signinUserName,
      password: this.props.signinPassword
    });
  }

  // login part +++++++++++++++++++++++
  loginHandler = ev => {
    ev.preventDefault();
    // this.props.redirectToLogin();
    this.props.makeRequest({ userName: this.props.userNameInput, password: this.props.passwordInput });
  }


  render() {
    return (
        <div className="login">
          <NavLink to="/" className="btn btn-primary login-out">Home</NavLink>

          <h1>login page</h1>
          <form className="loginForm" onSubmit={this.loginHandler}>
            <label>userName</label>
            <input type="text" placeholder="userName" required onChange={this.props.loginInputHandler} value={
              this.props.userNameInput}/>
            <label>Password</label>
            <input type="password" placeholder="password" required onChange={this.props.loginInputHandler} value={
              this.props.passwordInput}/>
            <button>Login</button>
          </form>
          {this.props.hasFailed && <div className="alert alert-danger my-4">Either username or password was incorrect. Try again!</div>}
          {this.props.loginRedirecion && <Redirect to="/create"/>}

          <form className="createAccountForm" onSubmit={this.signupHandler}>
            <h1>Not a user ? Create account</h1>
            <label>Email</label>
            <input onChange={this.props.signinInputHandler} ident="email" type="email" placeholder="Email" required />
            <label>userName</label>
            <input onChange={this.props.signinInputHandler} ident="username" placeholder="userName" required minLength={6} />
            <label>Password</label>
            <input onChange={this.props.signinInputHandler} ident="password" type="password" required placeholder="password" minLength={6} />
            <button>Signup</button>
          </form>

          {this.props.signinSuccess && <Alert variant='success'>{this.props.signinMsg}</Alert>}
          {this.props.signinFaild && <Alert variant='danger'>Signin faild</Alert>}

          {this.props.signupRedirect && <Redirect to="/create"/>}
        </div>

    
    )
  }
}

const mapStateToProps = state => {
  return {
    loginRedirecion: state.loginRedirecion,
    hasFailed: state.hasFailed,
    accountConfirm: state.accountConfirm,
    signupRedirect: state.signupRedirect,
    userNameInput:state.userNameInput,
    passwordInput:state.passwordInput,
    signinEmail: state.signinEmail,
    signinUserName: state.signinUserName,
    signinPassword: state.signinPassword,
    signinMsg: state.signinMsg,
    signinSuccess: state.signinSuccess,
    signinFaild: state.signinFaild
  }
}

const mapDispatchToProps = dispatch => {
  return {
    redirectToLogin: ev => dispatch(redirectToLogin(ev)),
    loginInputHandler: ev => dispatch(loginInputHandler(ev)),
    addAccountHandler: credentials => dispatch(signinFetch(credentials)),
    makeRequest: credentials => dispatch(loginFetch(credentials)),
    signinInputHandler: ev => dispatch(signinInputHandler(ev))
  }
}

export const LoginPageContainer = connect(mapStateToProps, mapDispatchToProps)(LoginPage);
