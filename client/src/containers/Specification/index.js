import React,
      { Component }   from 'react';
import Logo           from '../../components/Logo';
import Form           from '../Form';

import './style.css';

class Specification extends Component {
  
  
  render() {
    return (
      <div className="specifi">
        <Logo />
        <Form />
      </div>
    );
  }
}

export default Specification;