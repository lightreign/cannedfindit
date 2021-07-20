import React, {useState} from "react";
import { addType } from "../../store/actions";
import { connect } from "react-redux";
import { Button, Form } from "react-bootstrap-v5";

export const TypeCreate = ({dispatch}) => {
    const [type, setType] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const createType = (e) => {
        e.preventDefault();
        setSubmitting(true);

        if (type) {
            dispatch(addType({ name: type }));
            e.target.reset();
        }

        setSubmitting(false);
    };

    return (
        <Form id="typeCreateForm" onSubmit={createType}>
            <legend>Add a Product Type</legend>

            <Form.Group controlId="type">
                <Form.Label>Enter New Type:</Form.Label>
                <Form.Control name="type" onChange={e => setType(e.target.value)} required />
            </Form.Group>

            <Button variant="dark" disabled={submitting} type="submit">Add Type</Button>
        </Form>
    );
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    };
};

export const ConnectedTypeCreate = connect(mapStateToProps)(TypeCreate);