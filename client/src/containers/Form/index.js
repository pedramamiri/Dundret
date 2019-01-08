import React, { Component } from 'react';
import { connect }     from 'react-redux';
import { getSpecifi }  from '../../actions/specifiAction';
import { getSizes }    from '../../actions/sizeActions';
import { Validator }   from './formValidation'
import PropTypes       from 'prop-types';
import classNames      from 'classnames';
import {Calculator}    from '../../calculator'; 
import './style.css';



class Form extends Component {

  constructor(props){
    super(props)
    this.state ={
      classic:false,
      freeStyle:false,
      err      : ""
    }
  }

  setClassic = ()=>{
    this.setState({
      classic   :!this.state.classic,
      freeStyle : false
    });  
  }

  setFreeStyle = ()=>{
    this.setState({
      freeStyle:!this.state.freeStyle,
      classic  : false
    });  
  }

  submit = ()=>{
    let data = {
      length: Math.round(Number(this.length.value)),
      age: Math.round(Number(this.age.value)),
      classic:this.state.classic,
      freeStyle:this.state.freeStyle
    }

    const validator = new Validator(data);
    const validate  = validator.validate()
    if(!validate.success){
      this.setState({
        err : validate.err
      })
    }else{
      this.setState({
        err : ""
      });
      const calc = new Calculator(data);
      const specifi = calc.calculation();
      if(specifi.err.status){
        return alert(specifi.err.msg)
      }else{
        this.props.getSpecifi(specifi);

        var skisLoading = new Promise((resolve,reject)=>{
          this.props.getSizes(specifi)
          resolve({success:true})
        })
        skisLoading.then(()=>{
          const width = window.innerWidth
          window.scrollTo({
            top: 0, 
            left: width, 
            behavior: 'smooth'
          })  
        })
      }
    }
   
  }
      
  
  render() {
    return (
      <div className="form">
          <p>Var snäll och fyll i information nedan</p>
        <div>
            <span>Din kroppslängd:</span>
            <input ref={el=>this.length = el} type="text"/>
        </div>
        <div>
            <label>Din ålder:</label>
            <input ref={el=>this.age = el} type="text"/>
        </div>
        <button className={classNames(
                "type",
                {  
                  'choosenType' : this.state.classic
                }
                )}  onClick={this.setClassic}>klassisk</button>
        <button className={classNames(
                "type",
                {
                  'choosenType' : this.state.freeStyle,
                }
                )} onClick={this.setFreeStyle}>fristil</button>
        <button className="submit" onClick={this.submit}>Sök</button>
        <span className="errorMsg">{this.state.err}</span>
      </div>
    );
  }
}

Form.propTypes = {
  getSpecifi: PropTypes.func.isRequired,
  getSizes  : PropTypes.func.isRequired,
  specifi: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array
  ])
}


const mapStateToProps = (state)=>({
  specifi     : state.specification,
  skis_loaded : state.ski.loading
}) 
  
export default connect(mapStateToProps,{getSpecifi,getSizes})(Form);