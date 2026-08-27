import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Datetime from 'react-datetime';
import { addErrorNotification, addItem } from "../../store/actions";
import { connect } from "react-redux";
import { ConnectedLocationSelect } from "../Location/LocationSelect";
import { ConnectedProductSelect } from "../Product/ProductSelect";
import ProductScan from "../Product/ProductScan";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { clearBarcode } from "../../store/barcodeSlice";

export const ItemCreate = ({dispatch}) => {
    const [product, setProduct] = useState();
    const [expiry, setExpiry] = useState();
    const [location, setLocation] = useState('');
    const [qty, setQty] = useState(1);
    const [submitting, setSubmitting] = useState(false);
    const [showScanner, setShowScanner] = useState(false);

    const maxQty = 12;

    const barcode = useSelector(
        (state) => state.barcode.value
    );

    useEffect(() => {
        if (!barcode) return;

        console.log("Barcode received:", barcode);

        // e.g. find a product by barcode, and place it in the form, write a new api for it

        setShowScanner(false);

        dispatch(clearBarcode());
  }, [barcode, dispatch]);

    const createItem = (e) => {
        e.preventDefault();

        if (qty > maxQty) {
            dispatch(addErrorNotification(`Max quantity of ${maxQty}`));
            return;
        }

        setSubmitting(true);

        if (product && location && expiry) {
            const item = {
                product: product,
                description: product.brand.name + ' ' + product.type.name,
                location: {
                    name: location
                },
                expiry: expiry.toDate()
            };

            dispatch(addItem(item, qty));
            setQty(1);

            e.target.reset();
        } else {
            dispatch(addErrorNotification('Item details are missing, please complete form.'));
        }

        setSubmitting(false);
    };

    const inputProps = { 'data-testid': 'itemExpiry' };

    const now = new Date();
    const oneYearFromNow = now.setFullYear(now.getFullYear() + 1);

    return (
        <Form id="itemCreateForm" onSubmit={createItem} role="ItemForm">
            <legend>Create an Item</legend>

            <ConnectedProductSelect setProduct={e => setProduct(JSON.parse(e.target.value))} data-testid="productSelect"/>

            <Row>
                <Col>
                    <p>
                        <Button
                            variant="warning"
                            onClick={() => setShowScanner(true)}
                        >
                            Scan Item
                        </Button>
                    </p>
                </Col>
            </Row>

            <Form.Group controlId="expiry">
                <Form.Label>Expiry:</Form.Label>
                <Datetime
                    dateFormat="DD/MM/YYYY"
                    onChange={setExpiry}
                    timeFormat={false}
                    closeOnSelect={true}
                    inputProps={inputProps}
                    initialViewDate={oneYearFromNow}
                />
            </Form.Group>

            <ConnectedLocationSelect setLocation={e => setLocation(e.target.value)} data-testid="locationSelect"/>

            <Form.Group controlId="qty">
                <Form.Label>Quantity:</Form.Label>
                <Form.Control name="qty" type="number" onChange={e => setQty(parseInt(e.target.value))} defaultValue="1" step="1" min="1" max="20" inputMode="decimal" data-testid="qtyInput"/>
            </Form.Group>

            <Button variant="primary" disabled={submitting} type="submit">Add Item</Button>

             <ProductScan
                show={showScanner}
                onClose={() => setShowScanner(false)}
            />
        </Form>
    );
}

ItemCreate.propTypes = {
    dispatch: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    return {
        user: state.user,
    };
}

export const ConnectedItemCreate = connect(mapStateToProps)(ItemCreate);