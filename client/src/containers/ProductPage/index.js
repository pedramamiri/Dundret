import React,
       { Component }        from 'react';
import { 
  ReactComponent as Back
  }                         from '../../assets/svg/back.svg';
import { connect }          from 'react-redux';
import PropTypes            from 'prop-types';
import {SKIS_LOADED}        from '../../actions/types'
import './style.css';

class ProductPage extends Component {

  backToSpecifi = ()=>{
    window.scrollTo({
      top: 0, 
      left: 0, 
      behavior: 'smooth'
    })
  }
  
  render() {
    return (
      <div className="productsPage">
        <div className="back">
          <Back onClick={this.backToSpecifi} />  
        </div>
        {
        this.props.skis_loaded == SKIS_LOADED ?
        <div className="products">
          <div className="productsHint">
          {typeof this.props.specifi.skiLength == 'object' ?
              <h4>{`Den bästa skidlängden för dig är mellan ${this.props.specifi.skiLength.min}cm och ${this.props.specifi.skiLength.max}cm.
              Här nedan finns de bästa ${this.props.specifi.type === 'classic' ? "klassik" : "fristil"}a skidor altenativ som passar med din längd. `}</h4>
              :
              <h4>{`Den bästa skidlängden för dig är ${this.props.specifi.skiLength}cm.
             Här nedan finns de bästa ${this.props.specifi.type === 'classic' ? "klassik" : "fristil"}a skidor altenativ som passar med din längd.`}</h4>
          }
          </div>
          <div className="productsTips">
            

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
  skis         : PropTypes.array,
  specifi      : PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array
  ])
}


const mapStateToProps = (state)=>({
  skis           : state.ski.skis,
  specifi        : state.specification.specifi,
  skis_loaded    : state.ski.loading
}) 
  
export default connect(mapStateToProps,{})(ProductPage);



            