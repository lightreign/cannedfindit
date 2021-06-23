import React, { useEffect } from "react";
import { connect } from "react-redux";
import { listTypes } from "../../store/actions";

export const TypeSelect = ({types, listTypes, setProductType}) => {
    useEffect(() => {
        listTypes();
    }, []);

    return (
        <label>
            Product Type:
            <select onChange={setProductType} name="type" className="form-control">
                <option key="" value="">-- Select --</option>
                {types.map(type => (
                    <option key={type._id} value={type.name}>
                        {type.name}
                    </option>
                ))}
            </select>
        </label>
    );
};

const mapStateToProps = (state) => {
    return {
        types: state.types,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        listTypes() {
            dispatch(listTypes());
        }
    }
};

export const ConnectedTypeSelect = connect(mapStateToProps, mapDispatchToProps)(TypeSelect);