import React,
       { Component }   from 'react';
import { Snow }        from './canvas';
import Specification   from '../Specification';
import ProductPage     from '../ProductPage';
import { connect }     from 'react-redux';
import { getSpecifi }  from '../../actions/specifiAction';
import PropTypes       from 'prop-types';
import { 
  ReactComponent as Forward
  }                    from '../../assets/svg/forward.svg';
import smoothscroll    from 'smoothscroll-polyfill';
import './style.css';
smoothscroll.polyfill();

class FrontPage extends Component {
  
  componentDidMount(){
    const canvas = document.getElementById("canvas");
    const snow   = new Snow(canvas);
    snow.setDimention();
    snow.setParticles();
    snow.animate();
  }

  Forward = ()=>{
    const width = window.innerWidth
    window.scrollTo({
      top: 0, 
      left: width, 
      behavior: 'smooth'
    }) 
  }

  render() {
    return (
      <div className="FrontPage">
          <Specification />
          <canvas id="canvas">
          </canvas>
          { this.props.checkoutQTY ? <div className="forward" ><Forward onClick={this.Forward} /></div> : "" }
          <ProductPage /> 
      </div>
    );
  }
}



FrontPage.propTypes = {
  getSpecifi: PropTypes.func.isRequired,
  specifi: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array
  ]),
  skis_loaded  : PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool
  ])
}


const mapStateToProps = (state)=>({
  specifi     : state.specification,
  skis_loaded : state.ski.loading,
  checkoutQTY : state.checkout.checkout.qty
}) 
  
export default connect(mapStateToProps,{getSpecifi})(FrontPage);

