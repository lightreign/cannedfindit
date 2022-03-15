import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { listProducts } from "../../store/actions";
import { Form } from "react-bootstrap-v5";

export const ProductSelect = ({products, listProducts, setProduct}) => {
    useEffect(() => {
        listProducts();
    }, []);

    return (
        <Form.Group controlId="form.product" role="productSelect">
            <Form.Label>Product:</Form.Label>
            <Form.Select onChange={setProduct} name="product" data-testid="productSelect">
                <option key="" value="">-- Select --</option>
                {products.map(product => (
                    <option key={product._id} value={JSON.stringify(product)}>
                        {product.brand.name} {product.type.name} {product.volume ? product.volume + 'ml' : product.weight + 'g' }
                    </option>
                ))}
            </Form.Select>
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