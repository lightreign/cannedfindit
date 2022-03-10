import React from "react";
import { render } from "@testing-library/react";
import '@testing-library/jest-dom';
import { Notification } from "../../../../src/components/Notification/Notifications";

jest.mock('react-router-dom', () => ({
    useLocation: jest.fn().mockReturnValue({
        pathname: '/home',
        search: '',
        state: null,
    }),
}));

describe("Notifications component", () => {
    it("Adds and displays success notifications", () => {
        const clearNotifications = () => {};
        const notification = 'a success message';

        const { getByRole } = render(
            <Notification
                notification={notification}
                clearNotifications={clearNotifications}
                variant={'success'}
                show={true}/>
        );

        expect(getByRole('alert')).toHaveTextContent(notification);
        expect(getByRole('alert')).toHaveClass('alert-success');
    });

    it("Adds and displays error notifications", () => {
        const clearNotifications = () => {};
        const notification = 'an error message';

        const { getByRole } = render(
            <Notification
                notification={notification}
                clearNotifications={clearNotifications}
                show={true}/>
        );

        expect(getByRole('alert')).toHaveTextContent(notification);
        expect(getByRole('alert')).toHaveClass('alert-danger');
    });
});