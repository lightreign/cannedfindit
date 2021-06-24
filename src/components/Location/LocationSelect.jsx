import React, { useEffect } from "react";
import { connect } from "react-redux";
import { listLocations } from "../../store/actions";
import {Form} from "react-bootstrap-v5";

export const LocationSelect = ({locations, listLocations, setLocation}) => {
    useEffect(() => {
        listLocations();
    }, []);

    return (
        <Form.Group controlId="form.location">
            <Form.Label>Location:</Form.Label>
            <Form.Control as="select" onChange={setLocation} name="location">
                <option key="" value="">-- Select --</option>
                {locations.map(location => (
                    <option key={location._id} value={location.name}>
                        {location.name}
                    </option>
                ))}
            </Form.Control>
        </Form.Group>
    );
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