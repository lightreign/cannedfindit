import React, {useEffect} from "react";
import { Alert } from "react-bootstrap-v5";
import { connect, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { CLEAR_NOTIFICATIONS } from "../../store/types";


export const Notification = ({variant = "danger", show = false, notification}) => {
    const location = useLocation();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({
            type: CLEAR_NOTIFICATIONS
        });
    }, [location]);

    return (
        <Alert variant={variant} show={show}>
            { notification }
        </Alert>
    );
}

const mapStateToProps = (state) => {
    return {
        notification: state.notification.notification,
        show: state.notification.notification.length > 0,
        variant: state.notification.variant
    };
}

export const ConnectedNotificationBar = connect(mapStateToProps)(Notification);