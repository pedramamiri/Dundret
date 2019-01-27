import React,
       { Component }   from 'react';
import { connect }     from 'react-redux';
import PropTypes       from 'prop-types';
import classNames      from 'classnames';
import {getCheckout}   from '../../actions/checkoutAction';
import { 
    ReactComponent as Close
    }                  from '../../assets/svg/close.svg';

import './style.css';
import axios from 'axios';


class Checkout extends Component {
    

componentWillMount(){
    this.props.getCheckout()
}
plusSizeQty = (id,n)=>{
    let checkout = JSON.parse(sessionStorage.checkout)
    checkout.push({id:id,size:n})
    sessionStorage.setItem('checkout',JSON.stringify(checkout))
    this.props.getCheckout()
}
minusSizeQty = (id,n)=>{
    var check = true
    let checkout = JSON.parse(sessionStorage.checkout)
    var newCheckout = []
    checkout.forEach(item=>{
        if(check){
            if(item.id == id && item.size == n ){
                check = false
            }else{
               newCheckout.push(item)
            }
        }else{
            newCheckout.push(item)
        }
    })
    sessionStorage.setItem('checkout',JSON.stringify(newCheckout))
    this.props.getCheckout()
}  
delete = (id)=>{
    let checkout = JSON.parse(sessionStorage.checkout)
    checkout = checkout.filter(item=> item.id !== id )
    sessionStorage.setItem('checkout',JSON.stringify(checkout))
    this.props.getCheckout()
}
toShop = ()=>{
    var headers = {"Access-Control-Allow-Origin": "*"}
    axios.post('/api/pay',{tp:this.props.checkoutTP},headers)
        .then(res =>console.log(res.data))
        .catch(err=>console.log(err))
}

  
  

  render() {
    return (
      <div className="checkout">
          <h1>VARUKORG</h1>
          {
            this.props.checkoutQTY  ? 
                <div className="samma">
                    <span>Antal : {this.props.checkoutQTY} </span>
                    <span>Summan : {this.props.checkoutTP} </span>
                    <button onClick={this.toShop} className="toShop">Till betalning</button>
                </div>
            :
            ""

          }
          {
            this.props.checkoutQTY  ? 
                <div className="checkoutSortiments" >
                    {
                    this.props.checkoutProducts.map(item => 
                        
                        <div key={item.product._id} className="checkoutProduct">
   
                            <Close onClick={ ()=>this.delete(item.product._id)}  />
                            <div className="checkProSpecifi" >
                                <span>{item.product.name}</span>
                                <span>{item.product.model}</span>
                                <span>{item.product.price} kr</span>
                                <span style={{color:"red"}}>Storlek:</span>
                                {Object.keys(item.sizes).map(n=><span key={n}>{n} > <button onClick={()=>this.minusSizeQty(item.product._id,n)}  className="sizeQTY" >-</button> {item.sizes[n]} <button onClick={()=>this.plusSizeQty(item.product._id,n)} className="sizeQTY" >+</button></span>)}

                            </div>
                        
                        </div>
                    
                    )
                    }
                </div>
            :
            <h2>Det finns inte någon prudukt i varukorgen</h2>
          }
      </div>
    );
  }
}



Checkout.propTypes = {
 
  specifi: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array
  ]),
  skis_loaded  : PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool
  ]),
  checkoutQTY : PropTypes.number,
  checkoutProducts  : PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array
  ]),
  getCheckout : PropTypes.func
}


const mapStateToProps = (state)=>({
  specifi          : state.specification,
  skis_loaded      : state.ski.loading,
  checkoutQTY      : state.checkout.checkout.qty,
  checkoutTP       : state.checkout.checkout.totalPrice,
  checkoutProducts : state.checkout.checkout.products,
  checkout_loading : state.checkout.loading
}) 
  
export default connect(mapStateToProps,{getCheckout})(Checkout);