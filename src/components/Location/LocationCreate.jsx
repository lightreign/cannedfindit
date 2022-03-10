import React, {useState} from "react";
import { addLocation } from "../../store/actions";
import { connect } from "react-redux";
import {Button, Form} from "react-bootstrap-v5";

export const LocationCreate = ({dispatch}) => {
    const [location, setLocation] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const createLocation = (e) => {
        e.preventDefault();
        setSubmitting(true);

        if (location) {
            dispatch(addLocation({ name: location }));
            e.target.reset();
        }

        setSubmitting(false);
    };

    return (
        <Form id="locationForm" onSubmit={createLocation} role="LocationForm">
            <legend>Create an Item Location</legend>

            <Form.Group controlId="location">
                <Form.Label>Add a New Location:</Form.Label>
                <Form.Control name="location" data-testid="locationInput" onChange={e => setLocation(e.target.value)} required />
            </Form.Group>

            <Button variant="danger" disabled={submitting} type="submit">Add Location</Button>
        </Form>
    );
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
    };
};

export const ConnectedLocationCreate = connect(mapStateToProps)(LocationCreate);