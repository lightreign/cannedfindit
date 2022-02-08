import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import MockAdapter from "axios-mock-adapter";
import axios from "../../../src/store/api";

import { listBrands, addBrand } from "../../../src/store/actions";
import { LIST_BRANDS, ADD_BRAND, NOTIFY_SUCCESS } from "../../../src/store/types";
import {mockCreateResponse} from "../util";

const axiosMock = new MockAdapter(axios);

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("brand actions", () => {
    afterEach(() => {
        axiosMock.reset();
    });

    it( 'should trigger LIST_BRANDS store action on success', async () => {
        const response = [
            [
                {
                    _id : '11',
                    name : 'Newgate'
                },
                {
                    _id : '22',
                    name : 'Oldgate'
                }
            ]
        ];

        axiosMock.onGet("/brand").reply(200, response);

        const store = mockStore();
        await store.dispatch(listBrands());

        expect(store.getActions()).toEqual([
            { type: LIST_BRANDS, brands: response }
        ]);
    });

    it('should trigger ADD_BRAND when creating a new brand', async () => {
        const brandName = 'Crowfield';

        const brand = [ {
            name : brandName
        } ];

        const response = mockCreateResponse(brand, '99');

        axiosMock.onPost("/brand/new", { brand: brandName }).reply(201, response);

        const store = mockStore();
        await store.dispatch(addBrand(brandName));

        expect(store.getActions()).toEqual([
            { type: ADD_BRAND, brand: response },
            { type: NOTIFY_SUCCESS, message: "Brand created successfully" }
        ]);
    });
} );