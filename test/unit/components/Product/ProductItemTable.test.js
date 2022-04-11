import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { fireEvent, render } from "@testing-library/react";
import '@testing-library/jest-dom';
import { store, server, getPreloadedState } from "component-utils";
import { ProductItemTable } from "../../../../src/components/Product/ProductItemTable";

describe("ProductItemTable component", () => {
    beforeAll(() => server.listen());
    afterEach(() => server.resetHandlers());
    afterAll(() => server.close());

    it("Lists product item counts", () => {
        const items = getPreloadedState().items;
        const productItems = getPreloadedState().productItems;
        const listItems = jest.fn();
        const listProductItems = jest.fn();
        const changeMode = jest.fn();

        const { getByRole } = render(
            <BrowserRouter>
                <Provider store={store}>
                    <ProductItemTable listItems={listItems} productItems={productItems} listProductItems={listProductItems} changeMode={changeMode}/>
                </Provider>
            </BrowserRouter>
        );

        const list = getByRole('ProductItemList');
        expect(list).toHaveTextContent(items[0].product.type.name);
    });

    it("Clicking on product list item goes to ItemList", () => {
        const items = getPreloadedState().items;
        const productItems = getPreloadedState().productItems;
        const listItems = jest.fn();
        const listProductItems = jest.fn();
        const changeMode = jest.fn();

        const { getByText } = render(
            <BrowserRouter>
                <Provider store={store}>
                    <ProductItemTable listItems={listItems} productItems={productItems} listProductItems={listProductItems} changeMode={changeMode}/>
                </Provider>
            </BrowserRouter>
        );

        const listItem = getByText(items[0].product.type.name);
        fireEvent.click(listItem);
        expect(changeMode).toHaveBeenCalled();
    });
});
