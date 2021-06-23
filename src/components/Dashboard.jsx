import React from 'react';
import { connect } from "react-redux";
import { ConnectedInventoryList } from "./InventoryList";
import { ConnectedLocationCreate } from "./Location/LocationCreate";
import {ConnectedBrandCreate} from "./Brand/BrandCreate";
import {ConnectedTypeCreate} from "./Type/TypeCreate";
import {ConnectedProductCreate} from "./Product/ProductCreate";

export const Dashboard = ({user}) => (
    <div>
        <h2>Hello {user.name}</h2>
        {/*<ConnectedInventoryList/>*/}
        <ConnectedLocationCreate/>
        <ConnectedBrandCreate/>
        <ConnectedTypeCreate/>
        <ConnectedProductCreate/>
    </div>
);

function mapStateToProps(state) {
    return {
        user: state.user
    };
}

export const ConnectedDashboard = connect(mapStateToProps)(Dashboard);