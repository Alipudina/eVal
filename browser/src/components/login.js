import React, { Component } from 'react';
import { Redirect, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { redirectToLogin, loginInputHandler, addAccountHandler, confirmHandler, loginFetch } from '../redux';
import { Card, Button } from 'react-bootstrap';


// loginPage ######################
class LoginPage extends Component {

  state={
    name: '',
    email: '',
    userName: '',
    password: ''
  }

  // signup part ++++++++++++++++++++++++
  signupHandler= ev => {
    ev.preventDefault();
    // console.log(this.refs.email.value);
    this.setState({
      name: this.refs.name.value,
      email: this.refs.email.value,
      userName: this.refs.userName.value,
      password: this.refs.password.value,
    });

    setTimeout(() => {
      this.props.addAccount.push(this.state);
      this.props.addAccountHandler();
    }, 10)
  }

  // login part +++++++++++++++++++++++
  loginHandler= ev => {
    ev.preventDefault();
    // this.props.redirectToLogin();
      this.props.makeRequest({userName: this.props.userNameInput, password: this.props.passwordInput});}


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

          <form className="createAccountForm" onSubmit={this.props.signupHandler}>
            <h1>Not a user ? Create account</h1>
            <label>Name</label>
            <input placeholder="Name" ref="name" />
            <label>Email</label>
            <input placeholder="Email" ref="email" />
            <label>userName</label>
            <input required placeholder="userName" ref="userName" minLength={6} />
            <label>Password</label>
            <input required placeholder="password" type="password" ref="password" minLength={6} />
            <button>Signup</button>
          </form>
          <div className="account-container">
            {this.props.accountConfirm && this.props.addAccount.map(((elem, index) => {
              return (
                <Card style={{ width: '18rem' }} className="card-account" key={index}>
                  <Card.Body>
                    <Card.Title>Your Account</Card.Title>
                    <Card.Text>Name: {elem.name}</Card.Text>
                    <Card.Text>Email: {elem.email}</Card.Text>
                    <Card.Text>UserName: {elem.userName}</Card.Text>
                    <Card.Text>Password: {elem.password}</Card.Text>
                    <Button variant="primary" size="lg" onClick={this.props.confirmHandler}>Confirm</Button>
                  </Card.Body>
                </Card>
              )
            }))}
          </div>

          {this.props.signupRedirect && <Redirect to="/create"/>}
        </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    loginRedirecion: state.loginRedirecion,
    hasFailed: state.hasFailed,
    addAccount: state.addAccount,
    accountConfirm: state.accountConfirm,
    signupRedirect: state.signupRedirect,
    userNameInput:state.userNameInput,
    passwordInput:state.passwordInput
  }
}

const mapDispatchToProps= dispatch => {
  return {
    redirectToLogin: ev => dispatch(redirectToLogin(ev)),
    loginInputHandler: ev => dispatch(loginInputHandler(ev)),
    addAccountHandler: ev => dispatch(addAccountHandler(ev)),
    confirmHandler: ev => dispatch(confirmHandler(ev)),
      makeRequest: credentials => dispatch(loginFetch(credentials))
  }
}

export const LoginPageContainer=connect(mapStateToProps, mapDispatchToProps)(LoginPage);
