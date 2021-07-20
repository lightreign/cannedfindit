import React, {useEffect} from "react";
import { Alert } from "react-bootstrap-v5";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import { clearNotifications } from "../../store/actions";


export const Notification = ({notification, clearNotifications, variant = "danger", show = false}) => {
    const location = useLocation();

    useEffect(() => {
        clearNotifications();
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
};

const mapDispatchToProps = (dispatch) => {
    return {
        clearNotifications() {
            dispatch(clearNotifications());
        }
    }
};

export const ConnectedNotificationBar = connect(mapStateToProps, mapDispatchToProps)(Notification);