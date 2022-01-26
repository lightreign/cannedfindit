import * as actions from "../../../src/store/types";
import { itemDetailReducer } from "../../../src/store/reducers";
import Item from "../../../src/models/Item";

const item = {
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
};

test('should return the initial state', () => {
    expect(itemDetailReducer(undefined, {})).toEqual({});
});

test('should return item object', () => {
    expect(itemDetailReducer({}, { type: actions.GET_ITEM, item: item }))
        .toEqual(new Item( item ));
});

