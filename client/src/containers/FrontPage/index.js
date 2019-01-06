import React,
       { Component }   from 'react';
import { Snow }        from './canvas';
import Specification   from '../Specification';
import ProductPage     from '../ProductPage';
import { connect }     from 'react-redux';
import { getSpecifi }  from '../../actions/specifiAction';
import PropTypes       from 'prop-types';
import './style.css';

class FrontPage extends Component {
  
  componentDidMount(){
    const canvas = document.getElementById("canvas");
    const snow   = new Snow(canvas);
    snow.setDimention();
    snow.setParticles();
    snow.animate();
  }

  render() {
    return (
      <div className="FrontPage">
          <Specification />
          <canvas id="canvas">
          </canvas>
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
  specifi    : state.specification,
  skis_loaded : state.ski.loading
}) 
  
export default connect(mapStateToProps,{getSpecifi})(FrontPage);

