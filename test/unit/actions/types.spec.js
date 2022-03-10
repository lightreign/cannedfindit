import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import MockAdapter from "axios-mock-adapter";
import axios from "../../../src/store/api";

import { addType, listTypes } from "../../../src/store/actions";
import { LIST_TYPES, ADD_TYPE, NOTIFY_SUCCESS} from "../../../src/store/types";
import {mockCreateResponse} from "action-utils";

const axiosMock = new MockAdapter(axios);

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("product type actions", () => {
    afterEach(() => {
        axiosMock.reset();
    });

    it( 'should trigger LIST_TYPES store action on success', async () => {
        const response = [
            [
                {
                    _id : '33',
                    name : 'Spaghetti'
                },
                {
                    _id : '44',
                    name : 'Tomato Soup'
                }
            ]
        ];

        axiosMock.onGet("/type").reply(200, response);

        const store = mockStore();
        await store.dispatch(listTypes());

        expect(store.getActions()).toEqual([
            { type: LIST_TYPES, productTypes: response }
        ]);
    });

    it('should trigger ADD_TYPE when creating a new product type', async () => {
        const typeName = 'Orange Juice';

        const type = [ {
            name : typeName
        } ];

        const response = mockCreateResponse(type, '1010');

        axiosMock.onPost("/type/new", { type: typeName }).reply(201, response);

        const store = mockStore();
        await store.dispatch(addType(typeName));

        expect(store.getActions()).toEqual([
            { type: ADD_TYPE, productType: response },
            { type: NOTIFY_SUCCESS, message: "Product type created successfully" }
        ]);
    });
} );