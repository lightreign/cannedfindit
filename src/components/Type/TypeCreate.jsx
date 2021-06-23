import React from "react";
import { addType } from "../../store/actions";
import { connect } from "react-redux";

export const TypeCreate = ({createType, setType}) => (
    <form id="typeCreateForm" onSubmit={createType}>
        <div className="row">
            <label>
                Enter New Type:
                <input name="type" onChange={setType} required/>
            </label>
        </div>

        <button type="submit" className="btn btn-dark">Create Type</button>
    </form>
);

const mapStateToProps = (state) => {
    return {
        user: state.user
    };
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        createType(e) {
            e.preventDefault();

            dispatch(addType({name: ownProps.name}));
            e.target.reset();
        },
        setType(e) {
            ownProps.name = e.target.value;
        }
    };
};

export const ConnectedTypeCreate = connect(mapStateToProps, mapDispatchToProps)(TypeCreate);