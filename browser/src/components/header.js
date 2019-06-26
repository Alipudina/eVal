import React, { Component } from 'react';
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
