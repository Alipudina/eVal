import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../images/logo.png'
export default class Header extends Component {
  render() {
    return (
      <>

        <NavLink to="/" className="logobtn"> <img className="logo" src={logo} /></NavLink>

      </>
    )
  }
}
