import React from 'react';
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { ItemExpiry } from "./ItemExpiry";
import { Table } from "react-bootstrap-v5";
import { ConnectedItemPager } from "../Pager";
import Item from "../../models/Item";

export const ItemTable = ({items, listItems}) => {
    // Wrap items inside model objects
    items = items.map(item => {
        item = new Item(item);
        return item;
    });

    return (
        <div>
            <Table striped bordered hover role="ItemTable" data-testid="itemTable">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Location</th>
                    <th>Expires</th>
                </tr>
                </thead>
                <tbody>
                    {items.map(item => {
                        let expiryClass = '';

                        if (item.isExpired()) {
                            expiryClass = 'table-danger';
                        }

                        return (
                            <tr key={item._id} className={expiryClass}>
                                <td><Link
                                    to={`/item/id/${item._id}`}>{item.product.brand.name} {item.product.type.name}</Link>
                                </td>
                                <td>{item.location.name}</td>
                                <td><ItemExpiry item={item}/></td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
            <ConnectedItemPager fetchData={listItems}/>
        </div>
    );
};

ItemTable.propTypes = {
    items: PropTypes.array.isRequired,
    listItems: PropTypes.func.isRequired
};