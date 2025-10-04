import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { listBrands } from "../../store/actions";
import { Form } from "react-bootstrap-v5";
import { Autocomplete } from "../Autocomplete";

export const BrandSelect = ({brands, listBrands, setProductBrand}) => {
    useEffect(() => {
        listBrands();
    }, []);

    return (
        <Form.Group controlId="form.brand">
            <Form.Label>Brand:</Form.Label>
            <Autocomplete list={brands} setValue={setProductBrand} />
        </Form.Group>
    )
};

BrandSelect.propTypes = {
    brands: PropTypes.array.isRequired,
    listBrands: PropTypes.func.isRequired,
    setProductBrand: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    return {
        brands: state.brands,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        listBrands() {
            dispatch(listBrands());
        }
    }
};

export const ConnectedBrandSelect = connect(mapStateToProps, mapDispatchToProps)(BrandSelect);