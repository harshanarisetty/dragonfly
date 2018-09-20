import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Main from './main/main';
import Loader from './asserts/loader';
export default class Routes extends Component {
  render() {
    return (
      
         <Router>
            <Switch>
            <Route exact path='/' component={Main}/>
            <Route exact path='/loader' component={Loader}/>
            </Switch>
        </Router>

    )
  }
}
