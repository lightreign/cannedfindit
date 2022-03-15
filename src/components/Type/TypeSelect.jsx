import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { listTypes } from "../../store/actions";
import { Form } from "react-bootstrap-v5";

export const TypeSelect = ({types, listTypes, setProductType}) => {
    useEffect(() => {
        listTypes();
    }, []);

    return (
        <Form.Group controlId="form.type" role="TypeSelectForm">
            <Form.Label>Product Type:</Form.Label>
            <Form.Select onChange={setProductType} name="type" data-testid="typeSelect">
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

TypeSelect.propTypes = {
    types: PropTypes.array.isRequired,
    listTypes: PropTypes.func.isRequired,
    setProductType: PropTypes.func.isRequired
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