import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../images/logo.png'
export default class Header extends Component {
  render() {
    return (
      <div className="header">

        <div to="/" className="logobtn"> <img className="logo" alt="logo" src={logo} /></div>

      </div>
    )
  }
}
