import React from "react";
import { addProduct } from "../../store/actions";
import { connect } from "react-redux";
import {ConnectedTypeSelect} from "../Type/TypeSelect";
import {ConnectedBrandSelect} from "../Brand/BrandSelect";

export const ProductCreate = ({createProduct, setType, setBrand, setMass, setUnit}) => (
    <form id="productCreateForm" onSubmit={createProduct}>
        <div className="row">
            <ConnectedBrandSelect setProductBrand={setBrand}/>
        </div>
        <div className="row">
            <ConnectedTypeSelect setProductType={setType}/>
        </div>
        <div className="row">
            <label>
                Weight / Volume:
                <input name="mass" onChange={setMass} required/>
                <select name="unit" onChange={setUnit} defaultValue='g'>
                    <option value="g">grams</option>
                    <option value="ml">millilitres</option>
                </select>
            </label>
        </div>

        <button type="submit" className="btn btn-primary">Add Product</button>
    </form>
);

const mapStateToProps = (state, ownProps) => {
    return {
        user: state.user,
        types: state.types,
    };
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        createProduct(e) {
            e.preventDefault();

            if (ownProps.type && ownProps.brand) {
                const product = {
                    type: {
                        name: ownProps.type
                    },
                    brand: {
                        name: ownProps.brand
                    },
                };

                if (ownProps.unit === 'ml') {
                    product.volume = ownProps.mass;
                } else {
                    product.weight = ownProps.mass;
                }

                console.debug(ownProps, product);

                dispatch(addProduct(product));
                e.target.reset();
            } else {
                // TODO: error message
            }
        },
        setType(e) {
            ownProps.type = e.target.value;
        },
        setBrand(e) {
            ownProps.brand = e.target.value;
        },
        setMass(e) {
            ownProps.mass = e.target.value;
        },
        setUnit(e) {
            ownProps.unit = e.target.value;
        }
    };
};

export const ConnectedProductCreate = connect(mapStateToProps, mapDispatchToProps)(ProductCreate);