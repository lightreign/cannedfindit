import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import MockAdapter from "axios-mock-adapter";
import axios from "../../../src/store/api";

import { addProduct, listProducts } from "../../../src/store/actions";
import { ADD_PRODUCT, LIST_PRODUCTS, NOTIFY_SUCCESS } from "../../../src/store/types";
import { mockCreateResponse } from "../util";

const axiosMock = new MockAdapter(axios);

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("product actions", () => {
    afterEach(() => {
        axiosMock.reset();
    });

    it( 'should trigger LIST_PRODUCTS store action on success', async () => {
        const response = [
            [
                {
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
                }
            ]
        ];

        axiosMock.onGet("/product").reply(200, response);

        const store = mockStore();
        await store.dispatch(listProducts());

        expect(store.getActions()).toEqual([
            { type: LIST_PRODUCTS, products: response }
        ]);
    });

    it('should trigger ADD_PRODUCT when creating a new product', async () => {
        const product = {
            type: {
                _id: "1010",
                name: "Orange Juice"
            },
            brand: {
                _id: "1212",
                name: "OJuicy"
            },
            weight: 1500
        };

        const response = mockCreateResponse(product, '1111');
        axiosMock.onPost("/product/new", { product }).reply(201, response);

        const store = mockStore();
        await store.dispatch(addProduct(product));

        expect(store.getActions()).toEqual([
            { type: ADD_PRODUCT, product: response },
            { type: NOTIFY_SUCCESS, message: "Product created successfully" }
        ]);
    });
} );