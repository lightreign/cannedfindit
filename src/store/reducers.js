import * as actions from "./types";
import { defaultState } from "./defaultState";
import Item from "../models/Item";

export function itemReducer(items = defaultState.items, action) {
    switch (action.type) {
        case actions.LIST_ITEMS:
            action.items = action.items.map(item => {
                item = new Item(item);
                return item;
            });

            return action.items;

        case actions.ADD_ITEM:
            action.item.expiry = new Date(action.item.expiry);

            return [...items, action.item];
    }

    return items;
}

export function typeReducer(types = defaultState.types, action) {
    switch (action.type) {
        case actions.LIST_TYPES:
            return action.productTypes;
        case actions.ADD_TYPE:
            return [...types, action.productType];
    }

    return types;
}

export function locationReducer(locations = defaultState.locations, action) {
    switch (action.type) {
        case actions.LIST_LOCATIONS:
            return action.locations;
        case actions.ADD_LOCATION:
            return [...locations, action.location];
    }

    return locations;
}

export function brandReducer(brands = defaultState.brands, action) {
    switch (action.type) {
        case actions.LIST_BRANDS:
            return action.brands;
        case actions.ADD_BRAND:
            return [...brands, action.brand];
    }

    return brands;
}

export function productReducer(products = defaultState.products, action) {
    switch (action.type) {
        case actions.LIST_PRODUCTS:
            return action.products;
        case actions.ADD_PRODUCT:
            return [...products, action.product];
    }

    return products;
}

export function pagerReducer(pager = defaultState.pager, action) {
    switch (action.type) {
        case actions.UPDATE_PAGER:
            pager = {
                filter: action.filter,
                page: action.page,
                perPage: action.perPage,
                itemCount: parseInt(action.itemCount)
            };
    }

    return pager;
}

export function notificationReducer(notification = defaultState.notification, action) {
    switch (action.type) {
        case actions.NOTIFY_ERROR:
            notification = {
                type: 'error',
                variant: 'danger',
                notification: action.userMessage,
            };

            break;
        case actions.API_ERROR:
            notification = {
                type: 'error',
                variant: 'danger',
                notification: action.userMessage || action.error.message,
            };

            console.error(action.error);
            break;
        case actions.NOTIFY_SUCCESS:
            notification = {
                type: 'success',
                variant: 'success',
                notification: action.message,
            };
            break;
        case actions.CLEAR_NOTIFICATIONS:
            notification = {
                notification: '',
                type: null,
                variant: null
            };
    }

    return notification;
}