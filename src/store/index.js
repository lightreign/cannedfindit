import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from 'redux-thunk';
import { createLogger } from "redux-logger";
import * as reducer from "./reducers";

const logger = createLogger();
const middlewares = [ thunk ];

if (process.env.NODE_ENV === `development`) {
    middlewares.push(logger);
}

export const store = createStore(
    combineReducers({
        items: reducer.itemReducer,
        types: reducer.typeReducer,
        locations: reducer.locationReducer,
        brands: reducer.brandReducer,
        products: reducer.productReducer,
        pager: reducer.pagerReducer,
        item: reducer.itemDetailReducer,
        notification: reducer.notificationReducer,
        user: reducer.userReducer,
    }),
    composeWithDevTools(applyMiddleware(...middlewares))
);
