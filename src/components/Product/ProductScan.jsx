import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from 'react-redux';
import { Button, Modal } from "react-bootstrap";
import Scanner from "../Scanner";
import { barcodeScanned } from "../../store/barcodeSlice";

function ProductScan({ show, onClose }) {
    const dispatch = useDispatch();

    const handleScan = (barcode) => {
        dispatch(barcodeScanned(barcode));
    };

    return (
        <Modal show={show} onHide={onClose} fullscreen="sm-down" centered>
            <Modal.Header closeButton>
                <Modal.Title>Scan Product</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Scanner onScan={handleScan} />
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                  Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

ProductScan.propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default ProductScan;

