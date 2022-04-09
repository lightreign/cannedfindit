import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Form } from "react-bootstrap-v5";
import { connect } from "react-redux";
import { listItems } from "../../store/actions";

export const ItemSearch = ({dispatch, changeMode}) => {
    const [productType, setProductType] = useState('');
    const [searched, setSearched] = useState(true);

    const searchItems = (e) => {
        e.preventDefault();

        // A little hacky, if no product type reset form
        // TODO: This will get addressed in controlled input refactor
        if (!productType.length) {
            e.target.reset();
        }

        setSearched(true);

        changeMode('list');

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
        <Form id="searchForm" onSubmit={searchItems} role="SearchForm">
            <Form.Group controlId="searchItemProductType">
                <Form.Label>Search</Form.Label>
                <Form.Control name="search" onChange={searchChange} data-testid="search"/>
            </Form.Group>

            <Button variant="primary" type="submit" disabled={searched}>Search</Button>
            <Button variant="secondary" type="submit" onClick={onClear}>Clear</Button>
        </Form>
    );
};

ItemSearch.propTypes = {
    dispatch: PropTypes.func.isRequired,
    changeMode: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    return {
        user: state.user,
        items: state.items,
        pager: state.pager,
    };
}

export const ConnectedItemSearch = connect(mapStateToProps)(ItemSearch);

