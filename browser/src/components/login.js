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
<>
      <NavLink to="/" className="btn btn-primary float-right">Home</NavLink>
      <div className="login">


        <h1>login page</h1>
        <form className=" d-flex flex-column w-25 mx-auto mt-3" onSubmit={this.loginHandler}>
          <label>userName</label>
          <input type="text" placeholder="userName" required onChange={this.props.loginInputHandler} value={
            this.props.userNameInput} />
          <label>Password</label>
          <input type="password" placeholder="password" required onChange={this.props.loginInputHandler} value={
            this.props.passwordInput} />
          <button className="btn btn-primary">Login</button>
        </form>
        {this.props.hasFailed && <div className="alert alert-danger my-4">Either username or password was incorrect. Try again!</div>}
        {this.props.loginRedirecion && <Redirect to="/create" />}
        <h1>Not a user ? Create account</h1>
        <form className=" d-flex flex-column w-25 mx-auto mt-3" onSubmit={this.signupHandler}>

          <label>Email</label>
          <input onChange={this.props.signinInputHandler} ident="email" type="email" placeholder="Email" required />
          <label>userName</label>
          <input onChange={this.props.signinInputHandler} ident="username" placeholder="userName" required minLength={6} />
          <label>Password</label>
          <input onChange={this.props.signinInputHandler} ident="password" type="password" required placeholder="password" minLength={6} />
          <button className="btn btn-primary" >Signup</button>
        </form>

        {this.props.signinSuccess && <Alert variant='success'>{this.props.signinMsg}</Alert>}
        {this.props.signinFaild && <Alert variant='danger'>Signin failed. User Name or Email already taken</Alert>}

        {this.props.signupRedirect && <Redirect to="/create" />}
      </div>

      </>
    )

  }
}

const mapStateToProps = state => {
  return {
    loginRedirecion: state.loginRedirecion,
    hasFailed: state.hasFailed,
    accountConfirm: state.accountConfirm,
    signupRedirect: state.signupRedirect,
    userNameInput: state.userNameInput,
    passwordInput: state.passwordInput,
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
