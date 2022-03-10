import React, { useEffect } from "react";
import { connect } from "react-redux";
import { listLocations } from "../../store/actions";
import {Form} from "react-bootstrap-v5";

export const LocationSelect = ({locations, listLocations, setLocation}) => {
    useEffect(() => {
        listLocations();
    }, []);

    return (
        <Form.Group controlId="form.location" role="locationSelect">
            <Form.Label>Location:</Form.Label>
            <Form.Select onChange={setLocation} name="location" data-testid="locationSelect">
                <option key="" value="">-- Select --</option>
                {locations.map(location => (
                    <option key={location._id} value={location.name}>
                        {location.name}
                    </option>
                ))}
            </Form.Select>
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