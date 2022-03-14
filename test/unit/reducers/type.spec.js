import * as actions from "../../../src/store/types";
import { typeReducer } from "../../../src/store/reducers";

let newType = {
    name: "Garbanzo Beans"
};

describe('product type reducer tests', () => {
    test('should return the initial state', () => {
        expect(typeReducer(undefined, {})).toEqual([]);
    });

    test('should add a type', () => {
        expect(typeReducer([], {type: actions.ADD_TYPE, productType: newType}))
            .toEqual([newType]);
    });
});