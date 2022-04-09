import React from 'react';
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap-v5";
import { ConnectedProductItemPager } from "../Pager";

export const ProductItemTable = ({productItems, listProductItems, listItems, changeMode}) => {

    const viewProduct = (e) => {
        listItems({'product.type.name': e.target.innerHTML}, 1);
        changeMode('list');

        return true;
    };

    return (
        <div>
            <Table striped bordered hover role="ProductItemList">
                <thead>
                <tr>
                    <th>Name</th>
                    <th># Items</th>
                </tr>
                </thead>
                <tbody>
                {productItems.map(product => {
                    return (
                        <tr key={product._id}>
                            <td><Link to="#" onClick={viewProduct}>{product._id}</Link></td>
                            <td>{product.count}</td>
                        </tr>
                    )
                })}
                </tbody>
            </Table>
            <ConnectedProductItemPager fetchData={listProductItems}/>
        </div>
    );
};

ProductItemTable.propTypes = {
    productItems: PropTypes.array.isRequired,
    listProductItems: PropTypes.func.isRequired,
    listItems: PropTypes.func.isRequired,
    changeMode: PropTypes.func.isRequired
};