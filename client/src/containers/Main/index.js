import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import FrontPage from '../FrontPage';
import NotFound from '../NotFound';


class Main extends Component {
  
    render() {
      return (
        <div className="Main">
            <Switch>
                <Route exact path='/' component={FrontPage} />
                <Route path='*' component={NotFound} />
            </Switch>  
        </div>
      );
    }
  }
  
export default Main;