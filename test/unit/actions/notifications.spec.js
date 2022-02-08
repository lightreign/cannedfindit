import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import {addErrorNotification, clearNotifications} from "../../../src/store/actions";
import {CLEAR_NOTIFICATIONS, NOTIFY_ERROR} from "../../../src/store/types";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("notification actions", () => {
    it( 'should trigger NOTIFY_ERROR store action', async () => {
        const message = 'an error has occurred';

        const store = mockStore();
        await store.dispatch(addErrorNotification(message));

        expect(store.getActions()).toEqual([
            { type: NOTIFY_ERROR, userMessage: message },
        ]);
    });

    it( 'should CLEAR_NOTIFICATIONS when requested', async () => {
        const store = mockStore();
        await store.dispatch(clearNotifications());

        expect(store.getActions()).toEqual([
            { type: CLEAR_NOTIFICATIONS },
        ]);
    });
});