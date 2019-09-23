import React from 'react';
import './App.css';
import 'antd/dist/antd.css';
import {BrowserRouter as Router} from "react-router-dom";
import RouterView from "./router/RouterView"
import {routes} from "./router/router.config.js"
function App() {
  return (
    <Router>
        <RouterView routes={routes}></RouterView>
    </Router>
  );
}

export default App;
