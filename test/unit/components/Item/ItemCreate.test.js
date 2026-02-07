import React from "react";
import { Provider } from "react-redux";
import { getByTestId, render, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import { store, server, getPreloadedState } from "component-utils";
import { ItemCreate } from "../../../../src/components/Item/ItemCreate";

describe("ItemCreate component", () => {
    beforeAll(() => server.listen());
    afterEach(() => server.resetHandlers());
    afterAll(() => server.close());

    it("Displays create item form", () => {
        const { getByRole } = render(
            <Provider store={store}>
                <ItemCreate dispatch={jest.fn()}/>
            </Provider>
        );

        const form = getByRole('ItemForm');
        expect(form).toHaveTextContent('Create an Item');
    });

    it("Submits item", () => {
        const preloadedState = getPreloadedState();

        const createItem = jest.fn((dispatched) =>
            expect(dispatched.toString()).toContain('actions.ADD_ITEMS')
        );

        const { getByRole } = render(
            <Provider store={store}>
                <ItemCreate dispatch={createItem}/>
            </Provider>
        );

        const form = getByRole('ItemForm');
        const productSelect = getByTestId(form, 'productSelect');
        const locationSelect = getByTestId(form, 'locationSelect');


        const productDesc = [
            preloadedState.products[0].brand.name,
            preloadedState.products[0].type.name,
            preloadedState.products[0].weight + 'g',
        ].join(' ');

        fireEvent.focus(productSelect);
        fireEvent.click(getByRole('option', {name: productDesc}));

        fireEvent.focus(locationSelect);
        fireEvent.click(getByRole('option', {name: preloadedState.locations[0].name }));

        fireEvent.input(getByTestId(form, 'itemExpiry'), { target: { value: '08/03/2022' } });
        fireEvent.submit(form);

        expect(createItem).toHaveBeenCalledTimes(1);
    });
});
