import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { ConnectedItemList } from "./Item/ItemList";
import { getUser } from "../store/actions";

export const Dashboard = ({user, dispatch}) => {
    useEffect(() => {
        dispatch(getUser(1));
    }, []);

    return (
        <div>
            <h2 className="welcome">Hello {user.name ? user.name : user.hasOwnProperty('id') ? 'User' : '' }</h2>
            <ConnectedItemList/>
        </div>
    );
}

function mapStateToProps(state) {
    return {
        user: state.user
    };
}

export const ConnectedDashboard = connect(mapStateToProps)(Dashboard);