import * as actions from "../../../src/store/types";
import { itemReducer } from "../../../src/store/reducers";
import Item from "../../../src/models/Item";

let items = [
    new Item({
        _id: 1,
        product: {
            type: {
                name: "Sweetcorn"
            },
            brand: {
                name: "Newgate"
            },
            weight: 270,
            volume: null,
        },
        location: {
            name: "Storage Cupboard"
        },
        expiry: null,
    }
)];

let newItems = [{
    product: {
        type: {
            name: "Tomato Sauce"
        },
        brand: {
            name: "Newgate"
        },
        weight: null,
        volume: 300,
    },
    location: {
        name: "Storage Cupboard"
    },
    expiry: null,
}];

test('should return the initial state', () => {
    expect(itemReducer(undefined, {})).toEqual([]);
});

test('should add an item', () => {
    expect(itemReducer([], { type: actions.ADD_ITEMS, items: newItems }))
        .toEqual(newItems.map((item) => new Item(item) ) );
});

test('should consume an item', () => {
    expect(itemReducer(items, { type: actions.CONSUME_ITEM, item: items[0] })).toEqual([]);
});

test('can unconsume an item', () => {
    expect(itemReducer([], { type: actions.UNCONSUME_ITEM, item: items[0] })).toEqual(items);
});
