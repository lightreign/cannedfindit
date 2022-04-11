import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { fireEvent, render } from "@testing-library/react";
import '@testing-library/jest-dom';
import { store, server, getPreloadedState } from "component-utils";
import { ItemList } from "../../../../src/components/Item/ItemList";

describe("ItemList component", () => {
    beforeAll(() => server.listen());
    afterEach(() => server.resetHandlers());
    afterAll(() => server.close());

    it("Lists view toggle buttons and product items view", () => {
        const items = getPreloadedState().items;
        const productItems = getPreloadedState().productItems;
        const listItems = jest.fn();
        const listProductItems = jest.fn();

        const { getByRole, getByTestId } = render(
            <BrowserRouter>
                <Provider store={store}>
                    <ItemList items={items} listItems={listItems} productItems={productItems} listProductItems={listProductItems}/>
                </Provider>
            </BrowserRouter>
        );

        expect(listProductItems).toHaveBeenCalled();

        const groupBtn = getByTestId('group');
        const listBtn = getByTestId('list');

        expect(groupBtn).toBeDefined();
        expect(listBtn).toBeDefined();

        let table = getByRole('ProductItemList');
        expect(table).toHaveTextContent(items[0].product.type.name);
    });

    it("changes component view when buttons toggled", () => {
        const items = getPreloadedState().items;
        const productItems = getPreloadedState().productItems;
        const listItems = jest.fn();
        const listProductItems = jest.fn();

        const { getByRole, getByTestId } = render(
            <BrowserRouter>
                <Provider store={store}>
                    <ItemList items={items} listItems={listItems} productItems={productItems} listProductItems={listProductItems}/>
                </Provider>
            </BrowserRouter>
        );

        // Switch to view ItemTable component
        const listBtn = getByTestId('list');
        fireEvent.click(listBtn);

        const table = getByRole('ItemTable');
        expect(table).toHaveTextContent(items[0].product.type.name);
        expect(table).toHaveTextContent(items[0].product.brand.name);
        expect(table).toHaveTextContent(items[0].location.name);
        expect(listItems).toHaveBeenCalled();
    });
});
