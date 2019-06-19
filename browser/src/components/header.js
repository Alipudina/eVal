import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../images/back.jpg'
export default class Header extends Component {
  render() {
    return (
      <>

        <NavLink to="/" className="logobtn"> <img className="logo" alt="logo" src={logo} /></NavLink>

      </>
    )
  }
}
