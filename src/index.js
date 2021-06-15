import "core-js/stable";
import "regenerator-runtime/runtime";
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import bootstrap from 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import App from './components/App';
import { ConnectedDashboard } from "./components/Dashboard";
import { ConnectedNavigation } from "./components/Navigation";
import { ConnectedItemDetail } from "./components/ItemDetail";
import { inventory } from "./inventory";

ReactDOM.hydrate(
    <Router>
        <Provider store={inventory}>
            <ConnectedNavigation/>
            <Route exact path="/btngame" component={App}/>
            <Route exact path="/" component={ConnectedDashboard}/>
            <Route exact path="/item/:id" render={({match}) => (<ConnectedItemDetail match={match}/>)}/>
        </Provider>
    </Router>,
    document.getElementById('mountNode')
);
