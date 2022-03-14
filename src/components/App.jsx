import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../store";

import { ConnectedNavigation } from "./Navigation";
import { ConnectedDashboard } from "./Dashboard";
import { ConnectedItemDetail } from "./Item/ItemDetail";
import { ConnectedItemCreate } from "./Item/ItemCreate";
import { ConnectedTypeCreate } from "./Type/TypeCreate";
import { ConnectedBrandCreate } from "./Brand/BrandCreate";
import { ConnectedProductCreate } from "./Product/ProductCreate";
import { ConnectedLocationCreate } from "./Location/LocationCreate";
import { ConnectedNotificationBar } from "./Notification/Notifications";
import { ConnectedUserForm } from "./User";
import { Error } from "./Error/404";

export const App = () => (
    <Router>
        <Provider store={store}>
            <ConnectedNavigation/>
            <div className="container-fluid content">
                <ConnectedNotificationBar/>
                <Switch>
                    <Route exact path="/" component={ConnectedDashboard}/>
                    <Route exact path="/item/create" component={ConnectedItemCreate}/>
                    <Route exact path="/item/id/:id" render={({match}) => (<ConnectedItemDetail match={match}/>)}/>
                    <Route exact path="/type/create" component={ConnectedTypeCreate}/>
                    <Route exact path="/brand/create" component={ConnectedBrandCreate}/>
                    <Route exact path="/product/create" component={ConnectedProductCreate}/>
                    <Route exact path="/location/create" component={ConnectedLocationCreate}/>
                    <Route exact path="/user" component={ConnectedUserForm}/>
                    <Route component={Error}/>
                </Switch>
            </div>
        </Provider>
    </Router>
);

