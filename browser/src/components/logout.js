import React, { Component} from 'react';
import { NavLink } from 'react-router-dom';
import { logoutChanges } from '../redux';
import { connect } from 'react-redux';

class Logout  extends Component {

  logoutHandler= ev => {
    this.props.logoutChanges();
  }

  render () {
    return (
      <>
        <NavLink to="/" className="btn btn-primary login-out" onClick={this.logoutHandler}>Logout</NavLink>
      </>
    )
  }
}

const mapDispatchToProps= dispatch => {
  return {
    logoutChanges: ev => dispatch(logoutChanges(ev))
  }
}

export const LogoutContainer=connect(null, mapDispatchToProps)(Logout);
