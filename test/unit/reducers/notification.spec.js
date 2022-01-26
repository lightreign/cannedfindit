import * as actions from "../../../src/store/types";
import { notificationReducer } from "../../../src/store/reducers";

test('should return the initial state', () => {
    expect(notificationReducer({}, {})).toEqual({});
});

test('should add error notification', () => {
    const errorMessage = 'this is an error message';

    expect(notificationReducer(undefined, {
        type: actions.NOTIFY_ERROR,
        userMessage: errorMessage
    })).toEqual({
        type: 'error',
        variant: 'danger',
        notification: errorMessage,
    });
});

test('should add a success notification', () => {
    const message = 'this is a success message';

    expect(notificationReducer(undefined, {
        type: actions.NOTIFY_SUCCESS,
        message: message
    })).toEqual({
        type: 'success',
        variant: 'success',
        notification: message,
    });
});

test('should clear notifications', () => {
    expect(
        notificationReducer(
        {
            type: 'success',
            variant: 'success',
            userMessage: "old success message"
        },
        {
            type: actions.CLEAR_NOTIFICATIONS
        })
    ).toEqual({
        notification: '',
        type: null,
        variant: null
    });
});

