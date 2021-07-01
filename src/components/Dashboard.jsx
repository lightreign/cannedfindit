import React from 'react';
import { connect } from "react-redux";
import { ConnectedInventoryList } from "./InventoryList";

export const Dashboard = ({user}) => (
    <div>
        <h2 className="welcome">Hello {user.name}</h2>
        <ConnectedInventoryList/>
    </div>
);

function mapStateToProps(state) {
    return {
        user: state.user
    };
}

export const ConnectedDashboard = connect(mapStateToProps)(Dashboard);