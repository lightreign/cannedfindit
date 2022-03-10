import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { listItems } from "../../store/actions";
import { Table } from "react-bootstrap-v5";
import { ConnectedPager } from "../Pager";
import { ItemExpiry } from "./ItemExpiry";
import { ConnectedItemSearch } from "./ItemSearch";

export const ItemList = ({items, listItems}) => {
    useEffect(() => {
        listItems();
    }, []);

    return (
    <div>
        <ConnectedItemSearch />
        <legend>Item Inventory</legend>
        <Table striped bordered hover role="ItemList">
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
                            <td><Link to={`/item/id/${item._id}`}>{item.product.brand.name} {item.product.type.name}</Link></td>
                            <td>{item.location.name}</td>
                            <td><ItemExpiry item={item}/></td>
                        </tr>
                    )
                })}
            </tbody>
        </Table>
        <ConnectedPager fetchData={listItems}/>
    </div>
)};

const mapStateToProps = (state) => {
    return {
        user: state.user,
        items: state.items,
        pager: state.pager,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        listItems(search, page, perPage) {
            dispatch(listItems(search, page, perPage));
        }
    }
};

export const ConnectedItemList = connect(mapStateToProps, mapDispatchToProps)(ItemList);