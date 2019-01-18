import React,
       { Component }   from 'react';
import { connect }     from 'react-redux';
import PropTypes       from 'prop-types';
import classNames      from 'classnames';
import {getCheckout}   from '../../actions/checkoutAction';
import { 
    ReactComponent as Close
    }                  from '../../assets/svg/close.svg';
import { 
    ReactComponent as Setting
    }                  from '../../assets/svg/setting.svg';
import './style.css';


class Checkout extends Component {
    constructor(props){
        super(props);
        this.state = {
            setting :false
        }
    }

  componentWillMount(){
      this.props.getCheckout()
  }  

  setting = ()=>{
      this.setState({
          setting:!this.state.setting
      })
  }
  

  render() {
    return (
      <div className="checkout">
          <h1>VARUKORG</h1>
          {
            this.props.checkoutQTY && !this.props.checkout_loading ? 
                <div className="checkoutSortiments" >
                    {
                    this.props.checkoutProducts.map(item => 
                        
                        <div key={item.product._id} className="checkoutProduct">
                            <div className="settingClose">
                                <Setting onClick={this.setting} />
                                <Close onClick={this.delete}  />
                            </div>
                            <img src={item.product.image} alt="product" className="checkProImg" />
                            <div className="checkProSpecifi" >
                                <span>{item.product.name}</span>
                                <span>{item.product.model}</span>
                                <span>{item.product.price} kr</span>
                            </div>
                            <div className={
                                classNames(
                                    "checkProSizeQty",
                                    {"settingOpen" : this.state.setting}
                                )
                            } >
                                <div className= "settingClose">
                                    <Close onClick={this.setting}  />
                                </div>
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
  checkoutProducts : state.checkout.checkout.products,
  checkout_loading : state.checkout.loading
}) 
  
export default connect(mapStateToProps,{getCheckout})(Checkout);