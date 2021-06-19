import * as actions from "./types";
import { defaultState } from "../server/defaultState";

export function itemReducer(items = defaultState.items, action) {
    switch (action.type) {
        case actions.ADD_ITEM:
            alert('Added item successfully');
            return [...items, action.item];
        case actions.ERROR:
            alert('Added item failed');
            break;
    }

    return items;
}

export function typeReducer(types = defaultState.types) {
    return types;
}