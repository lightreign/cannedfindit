import React, { useEffect } from "react";
import { connect } from "react-redux";
import { listTypes } from "../../store/actions";
import { Form } from "react-bootstrap-v5";

export const TypeSelect = ({types, listTypes, setProductType}) => {
    useEffect(() => {
        listTypes();
    }, []);

    return (
        <Form.Group controlId="form.type">
            <Form.Label>Product Type:</Form.Label>
            <Form.Select onChange={setProductType} name="type">
                <option key="" value="">-- Select --</option>
                {types.map(type => (
                    <option key={type._id} value={type.name}>
                        {type.name}
                    </option>
                ))}
            </Form.Select>
        </Form.Group>
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