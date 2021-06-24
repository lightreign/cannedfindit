import React from "react";
import { addBrand } from "../../store/actions";
import { connect } from "react-redux";
import { Button, Form } from "react-bootstrap-v5";

export const BrandCreate = ({createBrand, setBrand}) => (
    <Form id="brandCreateForm" onSubmit={createBrand}>
        <legend>Create a Product Brand</legend>

        <Form.Group controlId="brand">
            <Form.Label>New Brand:</Form.Label>
            <Form.Control name="brand" onChange={setBrand} required />
        </Form.Group>

        <Button type="submit" className="btn btn-warning">Create Brand</Button>
    </Form>
);

const mapStateToProps = (state) => {
    return {
        user: state.user
    };
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        createBrand(e) {
            e.preventDefault();

            dispatch(addBrand({name: ownProps.name}));
            e.target.reset();
        },
        setBrand(e) {
            ownProps.name = e.target.value;
        }
    };
};

export const ConnectedBrandCreate = connect(mapStateToProps, mapDispatchToProps)(BrandCreate);