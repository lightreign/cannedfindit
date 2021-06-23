import React from 'react';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { ConnectedItemCreate } from "./Item/ItemCreate";

export const InventoryList = ({user, items}) => (
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
                        <td><Link to={`/item/${item._id}`}>{item.product.brand.name} {item.product.type.name}</Link></td>
                        <td>{item.location.name}</td>
                        <td>{item.expiry}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        <ConnectedItemCreate/>
    </div>
);

const mapStateToProps = (state) => {
    return {
        user: state.user,
        items: state.items,
    };
}

export const ConnectedInventoryList = connect(mapStateToProps)(InventoryList);