import React, { useState } from "react";
import { addBrand } from "../../store/actions";
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
        }

        setSubmitting(false);
    };

    return (
        <Form id="brandCreateForm" onSubmit={createBrand} role="BrandForm">
            <legend>Create a Product Brand</legend>

            <Form.Group controlId="brand">
                <Form.Label>New Brand:</Form.Label>
                <Form.Control name="brand" data-testid="brandInput" onChange={e => setBrand(e.target.value)} required />
            </Form.Group>

            <Button type="submit" disabled={submitting} className="btn btn-warning">Add Brand</Button>
        </Form>
    );
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    };
};

export const ConnectedBrandCreate = connect(mapStateToProps)(BrandCreate);