import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import FrontPage from '../FrontPage';
import NotFound from '../NotFound';
import Checkout from '../Checkout';
import Success from '../Success';


class Main extends Component {
  
    render() {
      return (
        <div className="Main">
            <Switch>
                <Route exact path='/' component={FrontPage} />
                <Route exact path='/checkout' component={Checkout} />
                <Route  path='/success' component={Success} />
                <Route path='*' component={NotFound} />
            </Switch>  
        </div>
      );
    }
  }
  
export default Main;