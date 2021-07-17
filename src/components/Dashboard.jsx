import React from 'react';
import { connect } from "react-redux";
import { ConnectedItemList } from "./Item/ItemList";

export const Dashboard = ({user}) => (
    <div>
        <h2 className="welcome">Hello {user.name}</h2>
        <ConnectedItemList/>
    </div>
);

function mapStateToProps(state) {
    return {
        user: state.user
    };
}

export const ConnectedDashboard = connect(mapStateToProps)(Dashboard);