import { createStore, applyMiddleware, combineReducers } from "redux";
import { defaultState } from "../server/defaultState";
import { createLogger } from "redux-logger";
import createSagaMiddleware from "redux-saga";

const sagaMiddleware = createSagaMiddleware();
import * as sagas from "./sagas";
import * as mutations from "./client";

export const inventory = createStore(
    combineReducers({
        user(user = defaultState.user) {
            return user;
        },
        items(items = defaultState.items, action) {
            switch (action.type) {
                case mutations.CREATE_ITEM:
                    return [...items, action.item];
            }

            return items;
        },
        types(types = defaultState.types) {
            return types;
        }
    }),
    applyMiddleware(createLogger(), sagaMiddleware)
);

for (let saga in sagas) {
    sagaMiddleware.run(sagas[saga]);
}
