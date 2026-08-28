import * as actions from "./types";
import { defaultState } from "./defaultState";

export function itemReducer(items = defaultState.items, action) {
    switch (action.type) {
        case actions.LIST_ITEMS:
            return action.items;

        case actions.ADD_ITEMS:
            action.items = action.items.map(item => {
                item.expiry = new Date(item.expiry);
                return item;
            });

            return [...items, ...action.items];

        case actions.CONSUME_ITEM:
            return items.filter(item => {
                return item._id !== action.item._id;
            });
        case actions.UNCONSUME_ITEM:
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

export function pagerReducer(pagers = defaultState.pagers, action) {
    switch (action.type) {
        case actions.UPDATE_PAGER:
            pagers[action.pager] = {
                filter: action.filter,
                page: action.page,
                perPage: action.perPage,
                total: parseInt(action.total)
            };
    }

    return Object.assign({}, pagers);
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

export function itemDetailReducer(item = defaultState.item, action) {
    switch (action.type) {
        case actions.CONSUME_ITEM:
        case actions.UNCONSUME_ITEM:
        case actions.GET_ITEM:
            item = action.item;
    }

    return item;
}

export function userReducer(user = defaultState.user, action) {
    switch (action.type) {
        case actions.GET_USER:
            if (!action.user.id) {
                user = { id: 0 };
            } else {
                user = action.user;
            }

            break;
        case actions.UPDATE_USER:
            user = action.user;
    }

    return user;
}

export function productItemsReducer(productItems = defaultState.productItems, action) {
    switch (action.type) {
        case actions.LIST_PRODUCT_ITEM_COUNT:
            productItems = action.productItems;
    }

    return productItems;
}
