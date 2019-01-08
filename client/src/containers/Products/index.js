import React,
       { Component }        from 'react';
import { connect }          from 'react-redux';
import PropTypes            from 'prop-types';
import classNames           from 'classnames';
import './style.css';

class Products extends Component {
    constructor(props){
        super(props);
        this.state = {
            skisCount : this.props.skis.length,
            counter   : 0
            
        }
    }

    next = ()=>{
        if(this.state.counter === this.state.skisCount-1){
            this.setState({
                counter: 0
            })
        }else{
            this.setState({
                counter: this.state.counter +1
            })
        }
    }

    previous = ()=>{
        if(this.state.counter === 0){
            this.setState({
                counter: this.state.skisCount -1
            })
        }else{
            this.setState({
                counter: this.state.counter -1
            })
        }
    }

    
    render() {
        var {_id,name,model,price,image,type,desc,configs} = this.props.skis[this.state.counter]
    return (
        <div className="products">
            <div className="product" key={_id}>
                <img src={image} alt="product" className="productsImage"/>
                <h2>{name}</h2>
                <p>{model}  {type}</p>
                <h3>{price} kr</h3>
                <h4>Description:</h4>
                <p>{desc}</p>
                <p>Storlek:</p>
                <select className="size">   
                {
                    configs.map(config=>{
                        if(typeof this.props.specifi.skiLength == 'object'){
                            if( config.qty !== 0  && config.length >= this.props.specifi.skiLength.min && config.length <= this.props.specifi.skiLength.max ){
                                return <option key={config._id} value={config.length}>{config.length}</option>
                            }
                        }else{
                            if(config.length === this.props.specifi.skiLength && config.qty !== 0){
                                return <option key={config._id} value={config.length}>{config.length}</option>
                            }
                        }
                    })
                }
                </select>
                <button className="shop">Till kassa</button>
                <button className={classNames(
                    "otherProducts",
                    {"enable" : this.state.skisCount >=2 }
                )} onClick={this.previous} disabled={this.state.skisCount <2}>Tidigare</button>
                <button className={classNames(
                    "otherProducts",
                    {"enable" : this.state.skisCount >=2 }
                )} onClick={this.next} disabled={this.state.skisCount <2}>Nästa</button>

            </div>
            
        
        </div>
    );
    }
}

Products.propTypes = {
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
  
export default connect(mapStateToProps,{})(Products);