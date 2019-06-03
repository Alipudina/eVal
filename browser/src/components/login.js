import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class LoginPgae extends Component {
  render() {
    return (
      <>
        <div className="login">
          <h1>login page</h1>
          <form className="loginForm">
            <label>userName</label>
            <input placeholder="userName" />
            <label>Password</label>
            <input placeholder="password" />
            <button>Submit</button>
          </form>
          <form className="createAccountForm" >
            <h1>Not a user ? Create account</h1>
            <label>Name</label>
            <input placeholder="Name" />
            <label>Email</label>
            <input placeholder="Email" />
            <label>userName</label>
            <input placeholder="userName" />
            <label>Password</label>
            <input placeholder="password" />
            <button>Submit</button>
          </form>
          <NavLink to="/creation" className="logbtn">CreationTempLink</NavLink>
        </div>
      </>
    )
  }
}