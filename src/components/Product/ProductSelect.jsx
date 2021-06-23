import React, { useEffect } from "react";
import { connect } from "react-redux";
import { listProducts } from "../../store/actions";

export const ProductSelect = ({products, listProducts, setProduct}) => {
    useEffect(() => {
        listProducts();
    }, []);

    return (
        <label>
            Product:
            <select onChange={setProduct} name="product" className="form-control">
                <option key="" value="">-- Select --</option>
                {products.map(product => (
                    <option key={product._id} value={product._id}>
                        {product.brand.name} {product.type.name} TODO: weight/volume FIX product
                    </option>
                ))}
            </select>
        </label>
    );
};

const mapStateToProps = (state) => {
    return {
        products: state.products,
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        listProducts() {
            dispatch(listProducts());
        }
    }
};

export const ConnectedProductSelect = connect(mapStateToProps, mapDispatchToProps)(ProductSelect);