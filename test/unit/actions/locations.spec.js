import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import MockAdapter from "axios-mock-adapter";
import axios from "../../../src/store/api";

import {addLocation, listLocations} from "../../../src/store/actions";
import {ADD_LOCATION, LIST_LOCATIONS, NOTIFY_SUCCESS} from "../../../src/store/types";
import {mockCreateResponse} from "../util";

const axiosMock = new MockAdapter(axios);

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("location actions", () => {
    afterEach(() => {
        axiosMock.reset();
    });

    it( 'should trigger LIST_LOCATIONS store action on success', async () => {
        const response = [
            [
                {
                    _id : '55',
                    name : 'Storage Cupboard'
                },
                {
                    _id : '66',
                    name : 'Garage'
                }
            ]
        ];

        axiosMock.onGet("/location").reply(200, response);

        const store = mockStore();
        await store.dispatch(listLocations());

        expect(store.getActions()).toEqual([
            { type: LIST_LOCATIONS, locations: response }
        ]);
    });

    it('should trigger ADD_LOCATION when creating a new location', async () => {
        const locationName = 'Garage';

        const location = [ {
            name : locationName
        } ];

        const response = mockCreateResponse(location, '1212');

        axiosMock.onPost("/location/new", { location: locationName }).reply(201, response);

        const store = mockStore();
        await store.dispatch(addLocation(locationName));

        expect(store.getActions()).toEqual([
            { type: ADD_LOCATION, location: response },
            { type: NOTIFY_SUCCESS, message: "Location created successfully" }
        ]);
    });
} );