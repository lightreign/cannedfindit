import * as actions from "../../../src/store/types";
import { pagerReducer } from "../../../src/store/reducers";

const action = {
    type: actions.UPDATE_PAGER,
    filter: "test",
    pager: 'item',
    page: 1,
    perPage: 20,
    total: "30"
};

describe('pager reducer tests', () => {
    test('should return the initial state', () => {
        expect(pagerReducer({}, {})).toEqual({});
    });

    test('should update pager', () => {
        expect(pagerReducer({}, action))
            .toEqual({
                item: {
                    filter: "test",
                    page: 1,
                    perPage: 20,
                    total: 30
                }
            });
    });
});