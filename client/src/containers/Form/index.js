import React, { Component } from 'react';
import './style.css';

class Form extends Component {
  
  
  render() {
    return (
      <div className="form">
          <p>Var snäll och fyll i information nedan</p>
        <div>
            <span>Din kroppslängd:</span>
            <input type="text"/>
        </div>
        <div>
            <label>Din ålder:</label>
            <input type="text"/>
        </div>
        <button>klassisk</button>
        <button>fristil</button>
        <button>submit</button>
      </div>
    );
  }
}

export default Form;