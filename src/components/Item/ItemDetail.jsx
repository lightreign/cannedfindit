import React from 'react';
import { connect } from 'react-redux';

const ItemDetail = ({item}) => (
    <div>
        <h4>Item: {item.product.brand.name} {item.product.type.name}</h4>
        <p>Location: {item.location.name}</p>
        <p>Expiry: {item.expiry.toLocaleString()}</p>
    </div>
);

const mapStateToProps = (state, ownProps) => {
   let id = ownProps.match.params.id;
   let item = state.items.find(item => item._id === id);

   // TODO: handle if no item

   return {
      item: item
   };
}

export const ConnectedItemDetail = connect(mapStateToProps)(ItemDetail);
