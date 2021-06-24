import React, {useEffect} from 'react';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { listItems } from "../store/actions";
import { Table } from "react-bootstrap-v5";

export const InventoryList = ({items, listItems}) => {
    useEffect(() => {
        listItems();
    }, []);

    return (
    <div>
        <legend>Item Inventory</legend>
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Location</th>
                    <th>Expires</th>
                </tr>
            </thead>
            <tbody>
                {items.map(item => (
                    <tr key={item._id}>
                        <td><Link to={`/item/id/${item._id}`}>{item.product.brand.name} {item.product.type.name}</Link></td>
                        <td>{item.location.name}</td>
                        <td>{item.expiry.toLocaleDateString()}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    </div>
)};

const mapStateToProps = (state) => {
    return {
        user: state.user,
        items: state.items,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        listItems() {
            dispatch(listItems());
        }
    }
};

export const ConnectedInventoryList = connect(mapStateToProps, mapDispatchToProps)(InventoryList);