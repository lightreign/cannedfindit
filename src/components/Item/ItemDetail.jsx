import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { Alert } from "react-bootstrap-v5";
import { Link } from "react-router-dom";
import { consumeItem, getItem } from "../../store/actions";
import {ItemExpiry} from "./ItemExpiry";

const ItemDetail = ({itemId, item, getItem, consume}) => {
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        if (!item._id) {
            getItem(itemId);
        }
    }, []);

    return (
        <div>
            {item._id &&
                <div>
                    <legend>Item</legend>
                    <h4>{item.product.brand.name} {item.product.type.name}</h4>
                    <p>Location: {item.location.name}</p>
                    <p><ItemExpiry item={item} label={'Expiry:'}/></p>
                    {item.consumed &&
                        <h4 className="text-danger">Item Consumed: {item.consumedDateString()}</h4>}
                </div>
            }

            <Link to="/" className="btn btn-primary">Dashboard</Link>
            <button className="btn btn-danger" onClick={e => { consume(e, setSubmitted, item._id)} } disabled={!item._id || submitted || item.consumed}>
                Consume
            </button>
        </div>
    );
};

const mapStateToProps = (state, ownProps) => {
   let id = ownProps.match.params.id;
   let item = state.items.find(item => item._id === id);

   // If we have a matching item in the state go grab that
   if (item && state.item._id !== id) {
       state.item = item;
   }

   return {
       itemId: ownProps.match.params.id,
       item: state.item
   };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getItem(id) {
            dispatch(getItem(id));
        },
        consume(e, setSubmitted, id) {
            e.preventDefault();
            setSubmitted(true);

            dispatch(consumeItem(id));
        }
    }
};

export const ConnectedItemDetail = connect(mapStateToProps, mapDispatchToProps)(ItemDetail);
