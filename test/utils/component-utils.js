/*
    Component test utilities
*/
import { configureStore } from "@reduxjs/toolkit";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

const state = {
    brands: [ {
        _id: "11",
        name: "Newgate"
    }],
    types: [{
        _id: "44",
        name: "Tomato Soup"
    }],
    products: [{
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
    }],
    locations: [ {
        _id: '44',
        name: 'Garage'
    }],
    items: [
        {
            _id: "1",
            product: {
                type: {
                    name: "Sweetcorn"
                },
                brand: {
                    name: "Newgate"
                },
                weight: 270,
                volume: null,
            },
            location: {
                name: "Storage Cupboard"
            },
            expiry: '2022-03-10 00:00:00',
        }
    ],
    productItems: [
        {
            _id: 'Sweetcorn',
            count: 1,
        }
    ],
    pagers: {
        item: {
            filter: {},
            page: 1,
            perPage: 20,
            itemCount: 0,
        },
        productItem: {
            filter: {},
            page: 1,
            perPage: 20,
            itemCount: 0,
        }
    }
};

const reducers = {
    types: () => { return state.types },
    brands: () => { return state.brands },
    locations: () => { return state.locations },
    products: () => { return state.products },
    items: () => { return state.items },
    pagers: () => { return state.pagers },
}

export const store = configureStore({ reducer: reducers, state });

export const getPreloadedState = () => {
    return state;
};

const handlers = [
    http.get('/api/type', () => {
        return HttpResponse.json(state.types);
    }),
    http.get('/api/location', () => {
        return HttpResponse.json(state.locations);
    }),
    http.get('/api/brand', () => {
        return HttpResponse.json(state.brands);
    }),
    http.get('/api/product', () => {
        return HttpResponse.json(state.products);
    }),
    http.get('/api/item', () => {
        return HttpResponse.json(state.items);
    })
];

export const server = setupServer(...handlers);