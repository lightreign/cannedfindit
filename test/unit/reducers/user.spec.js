import * as actions from "../../../src/store/types";
import { userReducer } from "../../../src/store/reducers";

let user = {
    id: 1,
    name: 'Test User'
};

describe('user reducer tests', () => {
    test('should return the initial state', () => {
        expect(userReducer(undefined, {})).toEqual({});
    });

    test('should get an existing user', () => {
        expect(userReducer([], { type: actions.GET_USER, user: user }))
            .toEqual(user);
    });

    test('attempted to fetch but no existing user', () => {
        expect(userReducer([], { type: actions.GET_USER, user: '' }))
            .toEqual({ id: 0 });
    });

    test('should update a user', () => {
        expect(userReducer([], { type: actions.UPDATE_USER, user: user }))
            .toEqual(user);
    });

});
