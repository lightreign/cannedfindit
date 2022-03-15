import React, { useEffect } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { ConnectedItemList } from "./Item/ItemList";
import { getUser } from "../store/actions";

export const Dashboard = ({user, dispatch}) => {
    useEffect(() => {
        dispatch(getUser(1));
    }, []);

    return (
        <div>
            {/* eslint-disable-next-line no-prototype-builtins */}
            <h2 className="welcome">Hello {user.name ? user.name : user.hasOwnProperty('id') ? 'User' : '' }</h2>
            <ConnectedItemList/>
        </div>
    );
};

Dashboard.propTypes = {
    user: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    return {
        user: state.user
    };
}

export const ConnectedDashboard = connect(mapStateToProps)(Dashboard);