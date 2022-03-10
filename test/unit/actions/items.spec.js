import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import MockAdapter from "axios-mock-adapter";
import axios from "../../../src/store/api";

import {listItems, getItem, addItem, consumeItem, unconsumeItem} from "../../../src/store/actions";
import {
    ADD_ITEMS,
    CONSUME_ITEM,
    GET_ITEM,
    LIST_ITEMS,
    NOTIFY_SUCCESS,
    UNCONSUME_ITEM,
    UPDATE_PAGER
} from "../../../src/store/types";
import {mockCreateResponse} from "action-utils";

const axiosMock = new MockAdapter(axios);

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("item actions", () => {
    afterEach(() => {
        axiosMock.reset();
    });

    it( 'should trigger LIST_ITEMS store action on success', async () => {
        const response = [
            [
                {
                    _id: "88",
                    product: {
                        type: {
                            _id: "44",
                            name: "Tomato Soup"
                        },
                        brand: {
                            _id: "11",
                            name: "Newgate"
                        },
                        _id: "77",
                        weight: 330
                    },
                    location: {
                        name: "Kitchen cupboard"
                    },
                    expiry: "2021-06-17T23:00:00.000Z"
                }
            ]
        ];

        const headers = {
            'x-total-count': 1,
        };

        axiosMock
            .onGet(/item\?.+/)
            .reply(200, response, headers);

        const store = mockStore();
        await store.dispatch(listItems('Tomato', 1, 20));

        expect(store.getActions()).toEqual([
            { type: LIST_ITEMS, items: response },
            { type: UPDATE_PAGER, filter: "Tomato", itemCount: 1, page: 1, perPage: 20 }
        ]);
    });

    it('should trigger GET_ITEM when retrieving item', async () => {
        const response = {
            _id: "88",
            product: {
                type: {
                    _id: "44",
                    name: "Tomato Soup"
                },
                brand: {
                    _id: "11",
                    name: "Newgate"
                },
                _id: "77",
                weight: 330
            },
            location: {
                name: "Kitchen cupboard"
            },
            expiry: "2021-06-17T23:00:00.000Z"
        };

        axiosMock.onGet('/item/88').reply(200, response);

        const store = mockStore();
        await store.dispatch(getItem(88));

        expect(store.getActions()).toEqual([
            { type: GET_ITEM, item: response }
        ]);
    });

    it('should trigger ADD_ITEMS when creating a new item', async () => {
        const qty = 1;
        const item = {
            product: {
                type: {
                    _id: "1010",
                    name: "Orange Juice"
                },
                brand: {
                    _id: "1212",
                    name: "OJuicy"
                },
                weight: 1500
            },
            location: {
                name: 'Kitchen Cupboard'
            },
            expiry: "2022-02-08T23:00:00.000Z",
        };

        const response = mockCreateResponse(item, '2222');

        axiosMock.onPost("/item/new", { item, qty }).reply(201, [ response ]);

        const store = mockStore();
        await store.dispatch(addItem(item, qty));

        expect(store.getActions()).toEqual([
            { type: ADD_ITEMS, items: [ response ] },
            { type: NOTIFY_SUCCESS, message: "Item added successfully" }
        ]);
    });

    it('should trigger CONSUME_ITEM when consuming an item', async () => {
        const id = '3333';
        const response = {
            _id: id,
            product: {
                type: {
                    _id: "1010",
                    name: "Orange Juice"
                },
                brand: {
                    _id: "1212",
                    name: "OJuicy"
                },
                weight: 1500
            },
            location: {
                name: 'Kitchen Cupboard'
            },
            expiry: "2022-02-08T23:00:00.000Z",
            consumed: "2022-02-07T14:30:22.000Z"
        };

        axiosMock
            .onPost("/item/consume", { id })
            .reply(200, response);

        const store = mockStore();
        await store.dispatch(consumeItem(id));

        expect(store.getActions()).toEqual([
            { type: CONSUME_ITEM, item: response },
            { type: NOTIFY_SUCCESS, message: "Item consumed, yum yum" }
        ]);
    });

    it('should trigger CONSUME_ITEM when consuming an item', async () => {
        const id = '3333';
        const response = {
            _id: id,
            product: {
                type: {
                    _id: "1010",
                    name: "Orange Juice"
                },
                brand: {
                    _id: "1212",
                    name: "OJuicy"
                },
                weight: 1500
            },
            location: {
                name: 'Kitchen Cupboard'
            },
            expiry: "2022-02-08T23:00:00.000Z",
            consumed: null
        };

        axiosMock
            .onPost("/item/unconsume", { id })
            .reply(200, response);

        const store = mockStore();
        await store.dispatch(unconsumeItem(id));

        expect(store.getActions()).toEqual([
            { type: UNCONSUME_ITEM, item: response },
            { type: NOTIFY_SUCCESS, message: "Item was unconsumed, phew!" }
        ]);
    });
} );