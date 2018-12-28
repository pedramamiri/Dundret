import React,
       { Component }   from 'react';
import './style.css'
import classNames      from 'classnames'; 
import { connect }     from 'react-redux';
import PropTypes       from 'prop-types';






class NotFound extends Component {
  
  
  render() {
      return (
        <div className="NotFound">
           
            
        </div>
      );
    }
  }



const mapStateToProps = (state)=>({
  
}) 
  
export default connect(mapStateToProps,{})(NotFound);