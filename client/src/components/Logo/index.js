import React, { Component } from 'react';
import logo from '../../assets/images/logo/dundret.png';
import './style.css';

class Logo extends Component {
  
    render() {
      return (
        <div className="Logo">
            <img src={logo} alt="logo" / >
        </div>
      );
    }
  }
  
export default Logo;