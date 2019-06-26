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
    this.props.makeRequest({ userName: this.props.userNameInput, password: this.props.passwordInput});
  }


  render() {
    return (
      <div className="log_signContainer">
        <NavLink to="/" className="btn btn-primary homeButton">Home</NavLink>



          <form className="main-form" onSubmit={this.loginHandler}>
            <h3 className="loginText">Login</h3>
            <div className="form-group">
            <label>Username</label>
            <input type="text" className="form-control" id="username" placeholder="Username" required onChange={this.props.loginInputHandler} value={this.props.userNameInput} />
            </div>

            <div className="form-group">
            <label>Password</label>
            <input type="password" className="form-control" id="pwd" placeholder="password" required onChange={this.props.loginInputHandler} value={
              this.props.passwordInput} />
            </div>

            <button className="btn btn-primary">Login</button>
          </form>
          {this.props.hasFailed && <div className="alert alert-danger my-4">Either username or password is incorrect. Try again!</div>}
          {this.props.loginRedirecion && <Redirect to="/create" />}


          <form className="main-form" onSubmit={this.signupHandler}>
            <h3 className="loginText">New User</h3>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input className="form-control" id="email" onChange={this.props.signinInputHandler} ident="email" type="email" placeholder="Email" required />
            </div>

            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input className="form-control" id="username" onChange={this.props.signinInputHandler} ident="username" placeholder="Username" required minLength={6} />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input className="form-control" id="password" onChange={this.props.signinInputHandler} ident="password" type="password" required placeholder="password" minLength={6} />
            </div>


            <button className="btn btn-primary" >Signup</button>
          </form>

          {this.props.signinSuccess && <Alert variant='success'>{this.props.signinMsg}</Alert>}
          {this.props.signinFaild && <Alert variant='danger'>Signin failed. User Name or Email already taken</Alert>}

          {this.props.signupRedirect && <Redirect to="/create" />}

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
    userNameInput: state.userNameInput,
    passwordInput: state.passwordInput,
    signinEmail: state.signinEmail,
    signinUserName: state.signinUserName,
    signinPassword: state.signinPassword,
    signinMsg: state.signinMsg,
    signinSuccess: state.signinSuccess,
    signinFaild: state.signinFaild,
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
