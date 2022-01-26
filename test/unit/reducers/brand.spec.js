import * as actions from "../../../src/store/types";
import { brandReducer } from "../../../src/store/reducers";

let newBrand = {
    name: "Newgate"
};

test('should return the initial state', () => {
    expect(brandReducer(undefined, {})).toEqual([]);
});

test('should add a brand', () => {
    expect(brandReducer([], { type: actions.ADD_BRAND, brand: newBrand }))
        .toEqual([ newBrand ] );
});

