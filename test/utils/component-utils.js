/*
    Component test utilities
*/
import { configureStore } from "@reduxjs/toolkit";
import { rest } from "msw";
import { setupServer } from "msw/node";
import Item from "../../src/models/Item";

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
        new Item({
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
        } )
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
    rest.get('/api/type', (req, res, ctx) => {
        return res(ctx.json(state.types))
    }),
    rest.get('/api/location', (req, res, ctx) => {
        return res(ctx.json(state.locations))
    }),
    rest.get('/api/brand', (req, res, ctx) => {
        return res(ctx.json(state.brands))
    }),
    rest.get('/api/product', (req, res, ctx) => {
        return res(ctx.json(state.products))
    }),
    rest.get('/api/item', (req, res, ctx) => {
        return res(ctx.json(state.items))
    })
];

export const server = setupServer(...handlers);