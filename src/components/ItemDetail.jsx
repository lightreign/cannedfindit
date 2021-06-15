import React from 'react';
import { connect } from 'react-redux';

const ItemDetail = ({
    id,
    item
}) => (
    <div>
        <h4>Item: {item.type.name}</h4>
        <p>Location: {item.location.name}</p>
        <p>Expiry: {item.expiry}</p>
    </div>
);

const mapStateToProps = (state, ownProps) => {
   let id = parseInt(ownProps.match.params.id);
   let item = state.items.find(item => item.id === id);

   return {
      id: id,
      item: item
   };
}

export const ConnectedItemDetail = connect(mapStateToProps)(ItemDetail);
