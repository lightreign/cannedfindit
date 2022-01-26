import * as actions from "../../../src/store/types";
import { locationReducer } from "../../../src/store/reducers";

let newLocation = {
    name: "Storage Cupboard"
};

test('should return the initial state', () => {
    expect(locationReducer(undefined, {})).toEqual([]);
});

test('should add a location', () => {
    expect(locationReducer([], { type: actions.ADD_LOCATION, location: newLocation }))
        .toEqual([ newLocation ] );
});

