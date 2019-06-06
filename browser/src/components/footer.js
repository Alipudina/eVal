import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import AboutUs from './aboutUs';
import Info from './info';

export default class Footer extends Component{
    render(){
        return (
            <>
              <div className="footer">
                <AboutUs />
                <Info />
                <NavLink to="/contact" className="btn btn-primary" activeStyle={{ opacity: '.4' }}>Contact</NavLink>
              </div>
            </>
            )
    }
}
