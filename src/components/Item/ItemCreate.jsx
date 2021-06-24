import React from "react";
import Datetime from 'react-datetime';
import { addItem } from "../../store/actions";
import { connect } from "react-redux";
import { ConnectedLocationSelect } from "../Location/LocationSelect";
import { ConnectedProductSelect } from "../Product/ProductSelect";
import { Button, Form } from "react-bootstrap-v5";

export const ItemCreate = ({createItem, setProduct, setExpiry, setLocation}) => (
    <Form id="itemCreateForm" onSubmit={createItem}>
        <legend>Create an Item</legend>

        <ConnectedProductSelect setProduct={setProduct}/>

        <Form.Group controlId="expiry">
            <Form.Label>Expiry:</Form.Label>
            <Datetime dateFormat="DD/MM/YYYY" onChange={setExpiry} timeFormat={false} closeOnSelect={true}/>
        </Form.Group>

        <ConnectedLocationSelect setLocation={setLocation}/>

        <Button variant="primary" type="submit">Add Item</Button>
    </Form>
);

const mapStateToProps = (state, ownProps) => {
    return {
        user: state.user
    };
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        createItem(e) {
            e.preventDefault();

            if (ownProps.product && ownProps.location && ownProps.expiry) {
                const item = {
                    product: ownProps.product,
                    location: {
                        name: ownProps.location
                    },
                    expiry: ownProps.expiry
                };

                dispatch(addItem(item));
                e.target.reset();
            } else {
                // TODO: error message
            }
        },
        setProduct(e) {
            ownProps.product = JSON.parse(e.target.value);
        },
        setExpiry(date) {
            ownProps.expiry = date.toDate();
        },
        setLocation(e) {
            ownProps.location = e.target.value;
        }
    };
};

export const ConnectedItemCreate = connect(mapStateToProps, mapDispatchToProps)(ItemCreate);