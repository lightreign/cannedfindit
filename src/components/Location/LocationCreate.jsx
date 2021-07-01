import React from "react";
import { addLocation } from "../../store/actions";
import { connect } from "react-redux";
import {Button, Form} from "react-bootstrap-v5";

export const LocationCreate = ({createLocation, setLocation}) => (
    <Form id="locationForm" onSubmit={createLocation}>
        <legend>Create an Item Location</legend>

        <Form.Group controlId="location">
            <Form.Label>Add a New Location:</Form.Label>
            <Form.Control name="location" onChange={setLocation} required />
        </Form.Group>

        <Button variant="danger" type="submit">Add Location</Button>
    </Form>
);

const mapStateToProps = (state) => {
    return {
        user: state.user,
    };
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        createLocation(e) {
            e.preventDefault();

            dispatch(addLocation({name: ownProps.name}));
            e.target.reset();
        },
        setLocation(e) {
            ownProps.name = e.target.value;
        }
    };
};

export const ConnectedLocationCreate = connect(mapStateToProps, mapDispatchToProps)(LocationCreate);