import React, { useState } from "react";
import { Button, Form } from "react-bootstrap-v5";
import { useDispatch } from "react-redux";
import { listItems } from "../../store/actions";

export const ItemSearch = () => {
    const [productType, setProductType] = useState('');
    const dispatch = useDispatch();

    const searchItems = (e) => {
        e.preventDefault();

        // A little hacky, if no product type reset form
        // TODO: This will get addressed in controlled input refactor
        if (!productType.length) {
            e.target.reset();
        }

        dispatch(listItems({'product.type.name': productType}));
    }

    return (
        <Form id="locationForm" onSubmit={searchItems}>
            <Form.Group controlId="searchItemProductType">
                <Form.Label>Search</Form.Label>
                <Form.Control name="search" onChange={(e) => { setProductType(e.target.value) }} />
            </Form.Group>

            <Button variant="primary" type="submit">Search</Button>
            <Button variant="secondary" type="submit" onClick={() => { setProductType('') }}>Clear</Button>
        </Form>
    );
}

