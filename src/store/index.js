import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from 'redux-thunk';
import { createLogger } from "redux-logger";
import { defaultState } from "./defaultState";
import * as reducer from "./reducers";

const logger = createLogger();

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
        pager: reducer.pagerReducer,
        notification: reducer.notificationReducer,
    }),
    composeWithDevTools(applyMiddleware(thunk, logger))
);
