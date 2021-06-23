import React, { useEffect } from "react";
import { connect } from "react-redux";
import { listLocations } from "../../store/actions";

export const LocationSelect = ({locations, listLocations, setLocation}) => {
    useEffect(() => {
        listLocations();
    }, []);

    return (
        <label>
            Location:
            <select onChange={setLocation} name="location" className="form-control">
                <option key="" value="">-- Select --</option>
                {locations.map(location => (
                    <option key={location._id} value={location.name}>
                        {location.name}
                    </option>
                ))}
            </select>
        </label>
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