import React, { useEffect } from "react";
import { connect } from "react-redux";
import { listBrands } from "../../store/actions";
import { Form } from "react-bootstrap-v5";

export const BrandSelect = ({brands, listBrands, setProductBrand}) => {
    useEffect(() => {
        listBrands();
    }, []);

    return (
        <Form.Group controlId="form.brand">
            <Form.Label>Brand:</Form.Label>
            <Form.Control as="select" onChange={setProductBrand} name="brand">
                <option key="" value="">-- Select --</option>
                {brands.map(brand => (
                    <option key={brand._id} value={brand.name}>
                        {brand.name}
                    </option>
                ))}
            </Form.Control>
        </Form.Group>
    )
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