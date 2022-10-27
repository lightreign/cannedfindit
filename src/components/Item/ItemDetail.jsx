import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { consumeItem, unconsumeItem, getItem } from "../../store/actions";
import { ItemExpiry } from "./ItemExpiry";
import Item from "../../models/Item";

export const ItemDetail = ({itemId, item, getItem, consume, unconsume}) => {
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        if (!item._id) {
            getItem(itemId);
        }
    }, []);

    const model = new Item(item);

    return (
        <div role="ItemDetail">
            {model._id &&
                <div>
                    <legend>Item</legend>
                    <h4>{model.product.brand.name} {model.product.type.name}</h4>
                    <p>Date Stored: {model.packedDateString() || 'Not Known'}</p>
                    <p>Location: {model.location.name}</p>
                    <ItemExpiry item={model} label={'Expires:'}/>
                    {model.consumed &&
                        <div className="consumed">
                            <h4 className="text-danger">Item Consumed: {model.consumedDateString()}</h4>
                        </div>
                    }
                </div>
            }

            <Link to="/" className="btn btn-primary">Dashboard</Link>
            {!model.consumed ?
                <button className="btn btn-danger" onClick={e => { consume(e, setSubmitted, model._id)} } disabled={!model._id || submitted} data-testid="btnConsume">
                    Consume
                </button>
                :
                <button className="btn btn-danger" onClick={e => { unconsume(e, setSubmitted, model._id)} } disabled={!model._id || submitted} data-testid="btnUnconsume">
                    Oops, unconsume!
                </button>
            }
        </div>
    );
};

ItemDetail.propTypes = {
    itemId: PropTypes.string,
    item: PropTypes.object.isRequired,
    getItem: PropTypes.func.isRequired,
    consume: PropTypes.func.isRequired,
    unconsume: PropTypes.func.isRequired
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

            setSubmitted(false);
        },
        unconsume(e, setSubmitted, id) {
            e.preventDefault();
            setSubmitted(true);

            dispatch(unconsumeItem(id));

            setSubmitted(false);
        }
    }
};

export const ConnectedItemDetail = connect(mapStateToProps, mapDispatchToProps)(ItemDetail);
