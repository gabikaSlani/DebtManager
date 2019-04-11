import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import Home from './components/Home';
import Friend from './components/Friend';
import NotFound from './components/NotFound';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter, Route, Switch} from "react-router-dom";


const routing = (
  <BrowserRouter>
      <Switch>
      <Route exact path="/" component={App}/>
      <Route path="/home/:id" component={Home}/>
      <Route path="/friend/:userId/:friendId" component={Friend}/>
      <Route component={NotFound}/>
      </Switch>
  </BrowserRouter>
);

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
