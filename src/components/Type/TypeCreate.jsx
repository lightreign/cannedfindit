import React from "react";
import { addType } from "../../store/actions";
import { connect } from "react-redux";
import { Button, Form } from "react-bootstrap-v5";

export const TypeCreate = ({createType, setType}) => (
    <Form id="typeCreateForm" onSubmit={createType}>
        <legend>Add a Product Type</legend>

        <Form.Group controlId="location">
            <Form.Label>Enter New Type:</Form.Label>
            <Form.Control name="type" onChange={setType} required />
        </Form.Group>

        <Button variant="dark" type="submit">Add Type</Button>
    </Form>
);

const mapStateToProps = (state) => {
    return {
        user: state.user
    };
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        createType(e) {
            e.preventDefault();

            dispatch(addType({name: ownProps.name}));
            e.target.reset();
        },
        setType(e) {
            ownProps.name = e.target.value;
        }
    };
};

export const ConnectedTypeCreate = connect(mapStateToProps, mapDispatchToProps)(TypeCreate);