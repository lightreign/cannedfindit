import React from 'react';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { addItem } from "../store/actions";

export const InventoryList = ({user, items, types, createItem, setItemType, setExpiry, setLocation}) => (
    <div>
        <legend>Item Inventory</legend>
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Location</th>
                    <th>Expiry</th>
                </tr>
            </thead>
            <tbody>
                {items.map(item => (
                    <tr key={item._id}>
                        <td><Link to={`/item/${item._id}`}>{item.type.name}</Link></td>
                        <td>{item.location.name}</td>
                        <td>{item.expiry}</td>
                    </tr>
                ))}
            </tbody>
        </table>

        <form onSubmit={createItem}>
            <div className="row">
                <label>
                    Name:
                    <select onChange={setItemType} name="type" className="form-control">
                        <option key="0" value="">-- Select --</option>
                        {types.map(type => (
                            <option key={type.name} value={type.name}>
                                {type.name}
                            </option>
                        ))}
                    </select>
                </label>
            </div>
            <div className="row">
                <label>
                    Expiry:
                    <input name="expiry" onChange={setExpiry} required/>
                </label>
            </div>
            <div className="row">
                <label>
                    Location:
                    <input name="location" onChange={setLocation} required/>
                </label>
            </div>

            <button type="submit" className="btn btn-primary">Add Item</button>
        </form>
    </div>
);

const mapStateToProps = (state, ownProps) => {
    console.log(state, ownProps);
    return {
        user: state.user,
        items: state.items,
        types: state.types,
    };
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        createItem(e) {
            e.preventDefault();

            // TODO: add proper validation
            if (ownProps.itemType && ownProps.expiry) {
                const item = {
                    type: {
                        name: ownProps.itemType
                    },
                    location: {
                        name: ownProps.location
                    },
                    expiry: ownProps.expiry
                };

                dispatch(addItem(item));
            } else {
                // TODO: error message
            }
        },
        setItemType(e) {
            ownProps.itemType = e.target.value;
        },
        setExpiry(e) {
            ownProps.expiry = e.target.value;
        },
        setLocation(e) {
            ownProps.location = e.target.value;
        }
    };
};

export const ConnectedInventoryList = connect(mapStateToProps, mapDispatchToProps)(InventoryList);