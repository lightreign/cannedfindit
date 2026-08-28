import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Button, Form } from "react-bootstrap";
import { connect, useSelector } from "react-redux";
import { listItems } from "../../store/actions";
import ProductScan from "../Product/ProductScan";
import { clearBarcode } from "../../store/barcodeSlice";

export const ItemSearch = ({dispatch, changeMode, search}) => {
    const searchTerms = Object.values(search);
    const term = searchTerms.length ? searchTerms[0] : '';

    const [productType, setProductType] = useState(term);
    const [searched, setSearched] = useState(searchTerms.length);
    const [showScanner, setShowScanner] = useState(false);

    const barcode = useSelector(
        (state) => state.barcode.value
    );

    useEffect(() => {
        if (!barcode) return;

        console.log("Barcode received:", barcode);
        setShowScanner(false);

        setSearched(true);
        changeMode('list');

        dispatch(
            listItems({
                    'product.barcode': barcode,
                }, 1
            )
        );

        dispatch(clearBarcode());
    }, [barcode, dispatch]);

    if (term) {
        changeMode('list');
    }

    const searchItems = (e) => {
        e.preventDefault();

        // A little hacky, if no product type reset form
        // TODO: This will get addressed in controlled input refactor
        if (!productType.length) {
            e.target.reset();
        }

        setSearched(true);

        changeMode('list');

        dispatch(
            listItems({
                    'product.type.name': productType,
                    'product.brand.name': productType,
                },
                1
            )
        );
    }

    const searchChange = e => {
        setSearched(false);
        setProductType(e.target.value.trim());
    };

    const onClear = () => {
        setSearched(false);
        setProductType('');
    };

    return (
        <Form id="searchForm" onSubmit={searchItems} role="SearchForm">
            <Form.Group controlId="searchItemProductType">
                <Form.Label>Search</Form.Label>
                <Form.Control name="search" onChange={searchChange} data-testid="search" defaultValue={term}/>
            </Form.Group>

            <Button variant="primary" type="submit" disabled={searched}>Search</Button>
            <Button variant="secondary" type="submit" onClick={onClear} disabled={!searched || !productType.length}>Clear</Button>
            <Button variant="warning" onClick={() => setShowScanner(true)}>Scan</Button>

            <ProductScan
                show={showScanner}
                onClose={() => setShowScanner(false)}
            />
        </Form>
    );
};

ItemSearch.propTypes = {
    dispatch: PropTypes.func.isRequired,
    changeMode: PropTypes.func.isRequired,
    search: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    return {
        user: state.user,
        items: state.items,
        pager: state.pager,
    };
}

export const ConnectedItemSearch = connect(mapStateToProps)(ItemSearch);

