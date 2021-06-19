import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from 'redux-thunk';
import { defaultState } from "../server/defaultState";
import { itemReducer, typeReducer } from "./reducers";

export const store = createStore(
    combineReducers({
        user(user = defaultState.user) {
            return user;
        },
        items: itemReducer,
        types: typeReducer
    }),
    composeWithDevTools(applyMiddleware(thunk))
);
