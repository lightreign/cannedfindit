import * as actions from "../../../src/store/types";
import { productReducer } from "../../../src/store/reducers";

let newProduct = {
    brand: {
        name: "Newgate"
    },
    type: {
        name: "Tomato Sauce"
    },
    weight: null,
    volume: 300
};

test('should return the initial state', () => {
    expect(productReducer(undefined, {})).toEqual([]);
});

test('should add a product', () => {
    expect(productReducer([], { type: actions.ADD_PRODUCT, product: newProduct }))
        .toEqual([ newProduct ] );
});
