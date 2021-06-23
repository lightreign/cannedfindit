import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from 'redux-thunk';
import { defaultState } from "../server/defaultState";
import * as reducer from "./reducers";

export const store = createStore(
    combineReducers({
        user(user = defaultState.user) {
            return user;
        },
        items: reducer.itemReducer,
        types: reducer.typeReducer,
        locations: reducer.locationReducer,
        brands: reducer.brandReducer,
        products: reducer.productReducer,
    }),
    composeWithDevTools(applyMiddleware(thunk))
);
