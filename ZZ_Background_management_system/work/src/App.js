import React from 'react';
import './App.css';
import {HashRouter  as Router} from "react-router-dom";
import RouterView from "./router/RouterView.js";
import routes from "./router/router.config.js";

function App() {
  return (
    <Router>
        <RouterView routes={routes}/>
    </Router>
  );
}

export default App;
