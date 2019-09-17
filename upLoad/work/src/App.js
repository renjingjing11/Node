import React, { Component } from 'react'
import {BrowserRouter as Router} from "react-router-dom";
import {routes} from "./router/router.config.js";
import RouterView from './router/RouterView';

export default class App extends Component {
  render() {
    return (
      <Router>
           <RouterView routes={routes}/>
      </Router>
    )
  }
}

