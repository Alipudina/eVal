import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { redirectToLogin, loginInputHandler, addAccountHandler, confirmHandler } from '../redux';
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
            <input required placeholder="Name" ref="name" />
            <label>Email</label>
            <input required placeholder="Email" ref="email" />
            <label>userName</label>
            <input required placeholder="userName" ref="userName" />
            <label>Password</label>
            <input required placeholder="password" type="password" ref="password" />
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

          {this.props.signupRedirect && <Redirect to="/creationPage"/>}
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
    signupRedirect: state.signupRedirect
  }
}

const mapDispatchToProps= dispatch => {
  return {
    redirectToLogin: ev => dispatch(redirectToLogin(ev)),
    loginInputHandler: ev => dispatch(loginInputHandler(ev)),
    addAccountHandler: ev => dispatch(addAccountHandler(ev)),
    confirmHandler: ev => dispatch(confirmHandler(ev))
  }
}

export const LoginPageContainer=connect(mapStateToProps, mapDispatchToProps)(LoginPage);
