import React from "react";
import Datetime from 'react-datetime';
import { addItem } from "../../store/actions";
import { connect } from "react-redux";
import { ConnectedLocationSelect } from "../Location/LocationSelect";
import { ConnectedProductSelect } from "../Product/ProductSelect";

export const ItemCreate = ({types, createItem, setProduct, setExpiry, setLocation}) => (
    <form id="itemCreateForm" onSubmit={createItem}>
        <div className="row">
            <ConnectedProductSelect setProduct={setProduct}/>
        </div>
        <div className="row">
            <label>
                Expiry:
                <Datetime dateFormat="DD/MM/YYYY" onChange={setExpiry} timeFormat={false} closeOnSelect={true}/>
            </label>
        </div>
        <div className="row">
            <ConnectedLocationSelect setLocation={setLocation}/>
        </div>

        <button type="submit" className="btn btn-primary">Add Item</button>
    </form>
);

const mapStateToProps = (state, ownProps) => {
    return {
        user: state.user
    };
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        createItem(e) {
            e.preventDefault();

            if (ownProps.product && ownProps.location && ownProps.expiry) {
                const item = {
                    product: ownProps.product,
                    location: {
                        name: ownProps.location
                    },
                    expiry: ownProps.expiry
                };

                dispatch(addItem(item));
                e.target.reset();
            } else {
                // TODO: error message
            }
        },
        setProduct(e) {
            ownProps.product = e.target.value;
        },
        setExpiry(date) {
            ownProps.expiry = date.toDate();
        },
        setLocation(e) {
            ownProps.location = e.target.value;
        }
    };
};

export const ConnectedItemCreate = connect(mapStateToProps, mapDispatchToProps)(ItemCreate);