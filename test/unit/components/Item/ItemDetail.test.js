import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { fireEvent, render } from "@testing-library/react";
import '@testing-library/jest-dom';
import { store, server, getPreloadedState } from "component-utils";
import { ItemDetail } from "../../../../src/components/Item/ItemDetail";
import Item from "../../../../src/models/Item";

describe("ItemDetail component", () => {
    beforeAll(() => server.listen());
    afterEach(() => server.resetHandlers());
    afterAll(() => server.close());

    it("Displays an item", () => {
        const item = getPreloadedState().items[0];
        const model = new Item(item);

        const { getByRole } = render(
            <BrowserRouter>
                <Provider store={store}>
                    <ItemDetail itemId={null} item={item} getItem={jest.fn()} consume={jest.fn()} unconsume={jest.fn()}/>
                </Provider>
            </BrowserRouter>
        );

        const list = getByRole('ItemDetail');
        expect(list).toHaveTextContent(model.product.type.name);
        expect(list).toHaveTextContent(model.product.brand.name);
        expect(list).toHaveTextContent(model.location.name);
        expect(list).toHaveTextContent('Expires');
        expect(list).toHaveTextContent(model.expiryDateString());
        expect(list).not.toHaveTextContent('Item Consumed:');
    });

    it("Consumes an item", () => {
        const item = getPreloadedState().items[0];
        const consume = jest.fn();

        const { getByRole, getByTestId } = render(
            <BrowserRouter>
                <Provider store={store}>
                    <ItemDetail itemId={item._id} item={item} getItem={jest.fn()} consume={consume} unconsume={jest.fn()}/>
                </Provider>
            </BrowserRouter>
        );

        const list = getByRole('ItemDetail');
        expect(list).not.toHaveTextContent('Oops, unconsume!');

        fireEvent.click(getByTestId('btnConsume'));
        expect(consume).toHaveBeenCalled();
    });

    it("Un-consumes an item", () => {
        const item = getPreloadedState().items[0];
        item.consumed = new Date();
        const unconsume = jest.fn();

        const { getByRole, getByTestId } = render(
            <BrowserRouter>
                <Provider store={store}>
                    <ItemDetail itemId={null} item={item} getItem={jest.fn()} consume={jest.fn()} unconsume={unconsume}/>
                </Provider>
            </BrowserRouter>
        );

        const list = getByRole('ItemDetail');
        expect(list).toHaveTextContent('Oops, unconsume!');

        fireEvent.click(getByTestId('btnUnconsume'));
        expect(unconsume).toHaveBeenCalled();
    });
});
