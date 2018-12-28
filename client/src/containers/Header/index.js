import React,
       { Component }   from 'react';
import './style.css'
import classNames      from 'classnames'; 
import LoginForm       from '../../components/LoginForm';
import Logo            from '../../components/Logo';
import { 
  ReactComponent as Close
  }                    from '../../assets/svg/close.svg';
import { connect }     from 'react-redux';
import { getFamilies } from '../../actions/familyActions';
import PropTypes       from 'prop-types';






class Header extends Component {
  constructor(props){
    super(props);
    this.state = {
      loginClicked : false
    }
  }
  componentDidMount(){
    this.props.getFamilies();
  }

  loginClick = ()=>{
    this.setState({
      loginClicked : !this.state.loginClicked
    })
  }
  
  render() {
      return (
        <div className="Header">
            <Logo />
            <div className="login">
              <button onClick={this.loginClick}>{this.state.loginClicked ? <Close /> : 'Login'}</button>
              <LoginForm className={classNames(
                {
                  'open' : this.state.loginClicked,
                }
              )} 
              />
          
            </div>
        </div>
      );
    }
  }
Header.propTypes = {
  getFamilies: PropTypes.func.isRequired,
  family: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array
  ])
}


const mapStateToProps = (state)=>({
  family: state.family
}) 
  
export default connect(mapStateToProps,{getFamilies})(Header);