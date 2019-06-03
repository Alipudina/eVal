import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class Footer extends Component{
    render(){
        return (
            <>
            <div className="footer">
            <NavLink to="/about">About Us</NavLink>
            <NavLink to="/info">Info</NavLink>
            <NavLink to="/contact">Contact</NavLink>
          </div>
            </>
            )
    }
}