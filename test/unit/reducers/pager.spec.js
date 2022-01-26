import * as actions from "../../../src/store/types";
import { pagerReducer } from "../../../src/store/reducers";

const action = {
    type: actions.UPDATE_PAGER,
    filter: "test",
    page: 1,
    perPage: 20,
    itemCount: "30"
};

test('should return the initial state', () => {
    expect(pagerReducer({}, {})).toEqual({});
});

test('should update pager', () => {
    expect(pagerReducer({}, action))
        .toEqual({
            filter: "test",
            page: 1,
            perPage: 20,
            itemCount: 30
        });
});

