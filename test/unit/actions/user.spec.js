import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import MockAdapter from "axios-mock-adapter";
import axios from "../../../src/store/api";

import { getUser, updateUser } from "../../../src/store/actions";
import { GET_USER, UPDATE_USER, NOTIFY_SUCCESS } from "../../../src/store/types";
import { mockCreateUserResponse } from "action-utils";

const axiosMock = new MockAdapter(axios);

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

describe("user actions", () => {
    afterEach(() => {
        axiosMock.reset();
    });

    it( 'should trigger GET_USER store action when retrieving user', async () => {
        const id = 1;

        const response = {
            id: id,
            name: 'Test User'
        };

        axiosMock.onGet("/user/" + id).reply(200, response);

        const store = mockStore();
        await store.dispatch(getUser(id));

        expect(store.getActions()).toEqual([
            { type: GET_USER, user: response }
        ]);
    });

    it('should trigger UPDATE_USER when updating a user', async () => {
        const username = 'Test User';

        const user = {
            name : username
        };

        const response = mockCreateUserResponse(user, '22');

        axiosMock.onPut("/user", { user: user }).reply(200, response);

        const store = mockStore();
        await store.dispatch(updateUser(user));

        expect(store.getActions()).toEqual([
            { type: UPDATE_USER, user: response },
            { type: NOTIFY_SUCCESS, message: "User was updated" }
        ]);
    });
} );