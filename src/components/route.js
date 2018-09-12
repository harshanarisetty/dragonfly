import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Main from './main/main';
import offline from './offline';
import Loader from './asserts/loader';
export default class Routes extends Component {
  render() {
    return (
      
         <Router>
            <Switch>
            {/* <Route exact path='/' component={App}/> */}
            <Route exact path='/' component={Main}/>
            <Route exact path='/offline' component={offline}/>
            <Route exact path='/loader' component={Loader}/>
            {/* <Route exact path='/ourservices' component={OurServices}/>
            <Route exact path='/adoption' component={AdoptionCenter}/>
            <Route exact path='/contactus' component={ContactUs}/>
            <Route exact path='/book' component={Book}/> */}
            </Switch>
        </Router>

    )
  }
}
