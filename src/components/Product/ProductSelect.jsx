import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { listProducts } from "../../store/actions";
import { Form } from "react-bootstrap-v5";
import { Autocomplete } from "../Autocomplete";

export const ProductSelect = ({products, listProducts, setProduct}) => {
    useEffect(() => {
        listProducts();
    }, []);

    const lineEntry = (entry) => (
        `${entry.brand.name} ${entry.type.name} ${entry.volume ? entry.volume + 'ml' : entry.weight + 'g' }`
    );

    return (
        <Form.Group controlId="form.product" role="productSelect">
            <Form.Label>Product:</Form.Label>
            <Autocomplete list={products} setValue={setProduct} lineEntry={lineEntry} selectJson testId="productSelect" />
        </Form.Group>
    );
};

ProductSelect.propTypes = {
    products: PropTypes.array.isRequired,
    listProducts: PropTypes.func.isRequired,
    setProduct: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    return {
        products: state.products,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        listProducts() {
            dispatch(listProducts());
        }
    }
};

export const ConnectedProductSelect = connect(mapStateToProps, mapDispatchToProps)(ProductSelect);