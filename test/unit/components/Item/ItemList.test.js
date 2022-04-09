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

    it("Lists items", () => {
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

        let list = getByRole('ProductItemList');
        expect(list).toHaveTextContent(items[0].product.type.name);
        expect(listProductItems).toHaveBeenCalled();

        // Go to list mode
        const listBtn = getByTestId('list')
        fireEvent.click(listBtn);

        list = getByRole('ItemList');
        expect(list).toHaveTextContent(items[0].product.type.name);
        expect(list).toHaveTextContent(items[0].product.brand.name);
        expect(list).toHaveTextContent(items[0].location.name);
        expect(listItems).toHaveBeenCalled();
    });
});
