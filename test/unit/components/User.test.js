import React from "react";
import { getByTestId, render, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import { User } from "../../../src/components/User";

describe("User component", () => {
    it("Displays user form", () => {
        const user = { id: 1, name: 'John' };

        const { getByRole } = render(
            <User user={user} getUser={jest.fn()} updateUser={jest.fn()}/>
        );

        const form = getByRole('UserForm');
        expect(form).toHaveTextContent('Change your name');
    });

    it("Changes user", () => {
        const user = { id: 1, name: 'John' };
        const updateUser = jest.fn();

        const { getByRole } = render(
            <User user={user} getUser={jest.fn()} updateUser={updateUser}/>
        );

        const form = getByRole('UserForm');

        fireEvent.input(getByTestId(form, 'userInput'), { target: { value: 'Michael' } });
        fireEvent.submit(form);

        expect(updateUser).toHaveBeenCalledTimes(1);
    });
});