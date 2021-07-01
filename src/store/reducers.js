import * as actions from "./types";
import { defaultState } from "../server/defaultState";

export function itemReducer(items = defaultState.items, action) {
    switch (action.type) {
        case actions.LIST_ITEMS:
            action.items = action.items.map(item => {
                item.expiry = new Date(item.expiry);
                return item;
            });

            return action.items;

        case actions.ADD_ITEM:
            action.item.expiry = new Date(action.item.expiry);

            alert('Added item successfully');
            return [...items, action.item];
        case actions.ITEM_ERROR:
            console.error(action.error);
            alert('Add/Update or list item failed');
            break;
    }

    return items;
}

export function typeReducer(types = defaultState.types, action) {
    switch (action.type) {
        case actions.LIST_TYPES:
            return action.productTypes;
        case actions.ADD_TYPE:
            alert('Type added successfully');
            return [...types, action.productType];
        case actions.TYPE_ERROR:
            console.error(action.error);
            alert('Add/Update or list type failed');
            break;
    }

    return types;
}

export function locationReducer(locations = defaultState.locations, action) {
    switch (action.type) {
        case actions.LIST_LOCATIONS:
            return action.locations;
        case actions.ADD_LOCATION:
            alert('Location added successfully');
            return [...locations, action.location];
        case actions.LOCATION_ERROR:
            console.error(action.error);
            alert('Add/Update or list location failed');
            break;
    }

    return locations;
}

export function brandReducer(brands = defaultState.brands, action) {
    switch (action.type) {
        case actions.LIST_BRANDS:
            return action.brands;
        case actions.ADD_BRAND:
            alert('Brand added successfully');
            return [...brands, action.brand];
        case actions.BRAND_ERROR:
            console.error(action);
            alert('Add/Update or list brand failed');
            break;
    }

    return brands;
}

export function productReducer(products = defaultState.products, action) {
    switch (action.type) {
        case actions.LIST_PRODUCTS:
            return action.products;
        case actions.ADD_PRODUCT:
            alert('Product added successfully');
            return [...products, action.product];
        case actions.PRODUCT_ERROR:
            console.error(action.error);
            alert('Add/Update or list product failed');
            break;
    }

    return products;
}

export function pagerReducer(pager = defaultState.pager, action) {
    switch (action.type) {
        case actions.GET_ITEM_COUNT:
            pager.itemCount = action.count;
    }

    return pager;
}