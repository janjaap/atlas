import React from 'react';
import { Route, Switch } from 'react-router';
import Nav from './Nav';
import Home from './pages/Home';
import Map from './pages/Map';


const routes = (
  <div className="page-container">
    <Nav />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/map" component={Map} />
      <Route component={Home} />
    </Switch>
  </div>
);

export default routes;
