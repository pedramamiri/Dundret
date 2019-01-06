import React,
       { Component }        from 'react';
import { 
  ReactComponent as Back
  }                         from '../../assets/svg/back.svg';
import { 
    ReactComponent as Cart
    }                         from '../../assets/svg/cart.svg';
import { connect }          from 'react-redux';
import PropTypes            from 'prop-types';
import {SKIS_LOADED}        from '../../actions/types'
import Products             from '../Products';
import './style.css';

class ProductPage extends Component {

  componentDidMount(){
    setTimeout(() => {
      if(!this.props.skis_loaded){
        this.backToSpecifi()
      }
    }, 4000);
  }

  backToSpecifi = ()=>{
    window.scrollTo({
      top: 0, 
      left: 0, 
      behavior: 'smooth'
    })
  }
  
  render() {
    if(this.props.skis_loaded === SKIS_LOADED && this.props.skis.length === 0){
      return(
        <div className="productsPage">
          <div className="back">
            <Back onClick={this.backToSpecifi} />  
          </div>
          <h2 style={{margin:"auto"}}>Vi har tyvärr inte någon skida som passar dig</h2>
        </div>  
      )
    }
    return (
      <div className="productsPage">
        <div className="back">
          <Back onClick={this.backToSpecifi} />  
        </div>
        {
        this.props.skis_loaded === SKIS_LOADED ?
        <div className="productsWrapp">
          
          <div className="productsTips">
            <Products />
          </div>
          <div className="footer">
          {typeof this.props.specifi.skiLength === 'object' ?
              <p>{`Den bästa skidlängden : ${this.props.specifi.skiLength.min}cm till ${this.props.specifi.skiLength.max}cm`}</p>
              :
              <p>{`Den bästa skidlängden :${this.props.specifi.skiLength}cm`}</p>
          }
          <Cart />
          </div>  
        </div>
        :
        <div className="loader"></div>
        }
      </div>
    );
  }
}

ProductPage.propTypes = {
  skis_loaded  : PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool
  ]),
  size_loading : PropTypes.bool,
  specification_loading : PropTypes.bool,
  skis         : PropTypes.array,
  specifi      : PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array
  ])
}


const mapStateToProps = (state)=>({
  skis                     : state.ski.skis,
  specifi                  : state.specification.specifi,
  skis_loaded              : state.ski.loading,
  size_loading             : state.size.loading,
  specification_loading    : state.specification.loading
}) 
  
export default connect(mapStateToProps,{})(ProductPage);



            