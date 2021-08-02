import React, { useEffect } from "react";
import { connect } from "react-redux";
import { listProducts } from "../../store/actions";
import { Form } from "react-bootstrap-v5";

export const ProductSelect = ({products, listProducts, setProduct}) => {
    useEffect(() => {
        listProducts();
    }, []);

    return (
        <Form.Group controlId="form.product">
            <Form.Label>Product:</Form.Label>
            <Form.Select onChange={setProduct} name="product">
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