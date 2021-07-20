import React, { useState } from "react";
import Datetime from 'react-datetime';
import { addErrorNotification, addItem } from "../../store/actions";
import { connect } from "react-redux";
import { ConnectedLocationSelect } from "../Location/LocationSelect";
import { ConnectedProductSelect } from "../Product/ProductSelect";
import { Button, Form } from "react-bootstrap-v5";

export const ItemCreate = ({dispatch}) => {
    const [product, setProduct] = useState();
    const [expiry, setExpiry] = useState();
    const [location, setLocation] = useState('');
    const [qty, setQty] = useState(1);
    const [submitting, setSubmitting] = useState(false);

    const maxQty = 10;

    const createItem = (e) => {
        e.preventDefault();

        setQty(parseInt(qty));

        if (qty > maxQty) {
            dispatch(addErrorNotification(`Max quantity of ${maxQty}`));
            return;
        }

        setSubmitting(true);

        if (product && location && expiry) {
            const item = {
                product: product,
                location: {
                    name: location
                },
                expiry: expiry.toDate()
            };

            // Create as many items as qty has said
            for (let i = 1; i <= qty; i++) {
                dispatch(addItem(item));
            }

            e.target.reset();
        } else {
            dispatch(addErrorNotification('Item details are missing, please complete form.'));
        }

        setSubmitting(false);
    };

    return (
        <Form id="itemCreateForm" onSubmit={createItem}>
            <legend>Create an Item</legend>

            <ConnectedProductSelect setProduct={e => setProduct(JSON.parse(e.target.value))}/>

            <Form.Group controlId="expiry">
                <Form.Label>Expiry:</Form.Label>
                <Datetime
                    dateFormat="DD/MM/YYYY"
                    onChange={setExpiry}
                    timeFormat={false}
                    closeOnSelect={true}
                />
            </Form.Group>

            <ConnectedLocationSelect setLocation={e => setLocation(e.target.value)}/>

            <Form.Group controlId="qty">
                <Form.Label>Quantity:</Form.Label>
                <Form.Control name="qty" type="number" onChange={e => setQty(e.target.value)} defaultValue="1" step="1" min="1" max="10" />
            </Form.Group>

            <Button variant="primary" disabled={submitting} type="submit">Add Item</Button>
        </Form>
    );
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
    };
}

export const ConnectedItemCreate = connect(mapStateToProps)(ItemCreate);