import React from "react";
import { connect } from 'react-redux';
import { Alert } from "react-bootstrap-v5";
import {Link} from "react-router-dom";

const ItemDetail = ({item}) => {
    return (
        <div>
            {item ?
            <div>
                <legend>Item</legend>
                <h4>{item.product.brand.name} {item.product.type.name}</h4>
                <p>Location: {item.location.name}</p>
                <p>Expiry: {item.expiry.toDateString()}</p>
            </div>
                : <Alert variant="warning">
                    Item could not be found.
                </Alert> }
            <Link to="/" className="btn btn-primary">Dashboard</Link>
        </div>
    );
};

const mapStateToProps = (state, ownProps) => {
   let id = ownProps.match.params.id;
   let item = state.items.find(item => item._id === id);

   return {
       item: item
   };
}

export const ConnectedItemDetail = connect(mapStateToProps)(ItemDetail);
