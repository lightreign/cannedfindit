import React from "react";
import { addBrand } from "../../store/actions";
import { connect } from "react-redux";

export const BrandCreate = ({createBrand, setBrand}) => (
    <form id="brandCreateForm" onSubmit={createBrand}>
        <div className="row">
            <label>
                Enter New Brand:
                <input name="brand" onChange={setBrand} required/>
            </label>
        </div>

        <button type="submit" className="btn btn-warning">Create Brand</button>
    </form>
);

const mapStateToProps = (state) => {
    return {
        user: state.user
    };
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        createBrand(e) {
            e.preventDefault();

            dispatch(addBrand({name: ownProps.name}));
            e.target.reset();
        },
        setBrand(e) {
            ownProps.name = e.target.value;
        }
    };
};

export const ConnectedBrandCreate = connect(mapStateToProps, mapDispatchToProps)(BrandCreate);