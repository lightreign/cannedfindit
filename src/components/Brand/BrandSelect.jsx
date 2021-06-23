import React, { useEffect } from "react";
import { connect } from "react-redux";
import { listBrands } from "../../store/actions";

export const BrandSelect = ({brands, listBrands, setProductBrand}) => {
    useEffect(() => {
        listBrands();
    }, []);

    return (
        <label>
            Brand:
            <select onChange={setProductBrand} name="brand" className="form-control">
                <option key="" value="">-- Select --</option>
                {brands.map(brand => (
                    <option key={brand._id} value={brand.name}>
                        {brand.name}
                    </option>
                ))}
            </select>
        </label>
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