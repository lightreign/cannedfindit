import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { listLocations } from "../../store/actions";
import { Form } from "react-bootstrap-v5";
import { Autocomplete } from "../Autocomplete";

export const LocationSelect = ({locations, listLocations, setLocation}) => {
    useEffect(() => {
        listLocations();
    }, []);

    return (
        <Form.Group controlId="form.location" role="locationSelect">
            <Form.Label>Location:</Form.Label>
            <Autocomplete list={locations} setValue={setLocation} testId="locationSelect" />
        </Form.Group>
    );
};

LocationSelect.propTypes = {
    locations: PropTypes.array.isRequired,
    listLocations: PropTypes.func.isRequired,
    setLocation: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    return {
        locations: state.locations,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        listLocations() {
            dispatch(listLocations());
        }
    }
};

export const ConnectedLocationSelect = connect(mapStateToProps, mapDispatchToProps)(LocationSelect);