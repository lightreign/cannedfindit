import React, { useState } from "react";
import PropTypes from "prop-types";
import { addBrand, addErrorNotification } from "../../store/actions";
import { connect } from "react-redux";
import { Button, Form } from "react-bootstrap-v5";

export const BrandCreate = ({dispatch}) => {
    const [brand, setBrand] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const createBrand = (e) => {
        e.preventDefault();
        setSubmitting(true);

        if (brand) {
            dispatch(addBrand({ name: brand }));
            e.target.reset();
        } else {
            dispatch(addErrorNotification('Brand name cannot be empty.'));
        }

        setSubmitting(false);
    };

    return (
        <Form id="brandCreateForm" onSubmit={createBrand} role="BrandForm">
            <legend>Create a Product Brand</legend>

            <Form.Group controlId="brand">
                <Form.Label>New Brand:</Form.Label>
                <Form.Control name="brand" data-testid="brandInput" onChange={e => setBrand(e.target.value)} />
            </Form.Group>

            <Button type="submit" disabled={submitting} className="btn btn-warning">Add Brand</Button>
        </Form>
    );
}

BrandCreate.propTypes = {
    dispatch: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    return {
        user: state.user
    };
};

export const ConnectedBrandCreate = connect(mapStateToProps)(BrandCreate);