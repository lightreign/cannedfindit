import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../store";
import { ConnectedNavigation } from "./Navigation";
import { ConnectedDashboard } from "./Dashboard";
import { ConnectedItemDetail } from "./Item/ItemDetail";
import bootstrap from 'bootstrap';

export const App = () => (
    <Router>
        <Provider store={store}>
            <ConnectedNavigation/>
            <Route exact path="/" component={ConnectedDashboard}/>
            <Route exact path="/item/:id" render={({match}) => (<ConnectedItemDetail match={match}/>)}/>
        </Provider>
    </Router>
);

