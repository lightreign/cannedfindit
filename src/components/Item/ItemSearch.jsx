import React, { useState } from "react";
import { Button, Form } from "react-bootstrap-v5";
import { useDispatch } from "react-redux";
import { listItems } from "../../store/actions";

export const ItemSearch = () => {
    const [productType, setProductType] = useState('');
    const [searched, setSearched] = useState(true);
    const dispatch = useDispatch();

    const searchItems = (e) => {
        e.preventDefault();

        // A little hacky, if no product type reset form
        // TODO: This will get addressed in controlled input refactor
        if (!productType.length) {
            e.target.reset();
        }

        setSearched(true);

        dispatch(listItems({'product.type.name': productType}, 1));
    }

    const searchChange = e => {
        setSearched(false);
        setProductType(e.target.value);
    };

    const onClear = () => {
        setSearched(false);
        setProductType('');
    };

    return (
        <Form id="searchForm" onSubmit={searchItems}>
            <Form.Group controlId="searchItemProductType">
                <Form.Label>Search</Form.Label>
                <Form.Control name="search" onChange={searchChange} />
            </Form.Group>

            <Button variant="primary" type="submit" disabled={searched}>Search</Button>
            <Button variant="secondary" type="submit" onClick={onClear}>Clear</Button>
        </Form>
    );
}

