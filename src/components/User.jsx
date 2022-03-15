import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Alert, Button, Form } from "react-bootstrap-v5";
import { getUser, updateUser } from "../store/actions";

export const User = ({user, getUser, updateUser}) => {
    useEffect(() => {
        getUser(1);
    }, []);

    const [username, setUsername] = useState(user.name);
    const [submitting, setSubmitting] = useState(false);

    const editUser = (e) => {
        e.preventDefault();
        setSubmitting(true);

        if (username) {
            updateUser({ name: username });
            e.target.reset();
        }

        setSubmitting(false);
    };

    return (
        <div>
            {user.hasOwnProperty('id') ?
                <Form id="userForm" onSubmit={editUser} role="UserForm">
                    <legend>{user.name ? 'Change' : 'Set'} your name</legend>

                    <Form.Group controlId="user">
                    <Form.Label>Name:</Form.Label>
                        <Form.Control name="username" data-testid="userInput" onChange={e => setUsername(e.target.value)} defaultValue={user.name} required />
                    </Form.Group>

                    <Button type="submit" disabled={submitting} className="btn btn-danger">Change</Button>
                </Form>
                :
                <Alert variant="danger" show="true">
                    Unable to get user details
                </Alert>
            }
        </div>
    );
}

User.propTypes = {
    user: PropTypes.object.isRequired,
    getUser: PropTypes.func.isRequired,
    updateUser: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    return {
        user: state.user
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getUser(id) {
            dispatch(getUser(id));
        },
        updateUser(user) {
            dispatch(updateUser(user));
        }
    }
};

export const ConnectedUserForm = connect(mapStateToProps, mapDispatchToProps)(User);