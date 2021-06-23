import React from "react";
import { addLocation } from "../../store/actions";
import { connect } from "react-redux";

export const LocationCreate = ({createLocation, setLocation}) => (
    <form id="locationForm" onSubmit={createLocation}>
        <div className="row">
            <label>
                Enter New Location:
                <input name="location" onChange={setLocation} required/>
            </label>
        </div>

        <button type="submit" className="btn btn-danger">Add Location</button>
    </form>
);

const mapStateToProps = (state) => {
    return {
        user: state.user,
    };
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        createLocation(e) {
            e.preventDefault();

            dispatch(addLocation({name: ownProps.name}));
            e.target.reset();
        },
        setLocation(e) {
            ownProps.name = e.target.value;
        }
    };
};

export const ConnectedLocationCreate = connect(mapStateToProps, mapDispatchToProps)(LocationCreate);