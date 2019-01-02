import React,
       { Component }        from 'react';
import { 
  ReactComponent as Back
  }                         from '../../assets/svg/back.svg';
import './style.css';

class Products extends Component {

  backToSpecifi = ()=>{
    window.scrollTo({
      top: 0, 
      left: 0, 
      behavior: 'smooth'
    })
  }
  
  render() {
    return (
      <div className="products">
        <div className="back">
          <Back onClick={this.backToSpecifi} />  
        </div>
          
      </div>
    );
  }
}

export default Products;