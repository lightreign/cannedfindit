import React from "react";
import { Provider } from "react-redux";
import {fireEvent, render} from "@testing-library/react";
import '@testing-library/jest-dom';
import { store } from "component-utils";
import { Pager } from "../../../src/components/Pager";

describe("Pager component", () => {
    it("Hides Pager <= 1 page", () => {
        const listItem = jest.fn();

        const { getByRole } = render(
            <Provider store={store}>
                <Pager page={1} perPage={20} total={5} fetchData={listItem}/>
            </Provider>
        );

        const pager = getByRole('Pager');
        expect(pager).not.toHaveTextContent('1');
    });

    it("Shows Pager > 1 page", () => {
        const listItem = jest.fn();

        const { getByRole } = render(
            <Provider store={store}>
                <Pager page={1} perPage={20} total={55} fetchData={listItem}/>
            </Provider>
        );

        const pager = getByRole('Pager');
        expect(pager).toHaveTextContent('1');
        expect(pager).toHaveTextContent('2');
    });

    it("Changes page", () => {
        const listItem = jest.fn();

        const { getByText } = render(
            <Provider store={store}>
                <Pager page={1} perPage={20} total={55} fetchData={listItem}/>
            </Provider>
        );

        fireEvent.click(getByText('2'));
        expect(listItem).toBeCalledTimes(1);
    });
});