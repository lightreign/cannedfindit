import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { render } from "@testing-library/react";
import '@testing-library/jest-dom';
import { store, server, getPreloadedState } from "component-utils";
import { ItemTable } from "../../../../src/components/Item/ItemTable";

describe("ItemTable component", () => {
    beforeAll(() => server.listen());
    afterEach(() => server.resetHandlers());
    afterAll(() => server.close());

    it("Lists items", () => {
        const items = getPreloadedState().items;
        const listItems = jest.fn();

        const { getByRole } = render(
            <BrowserRouter>
                <Provider store={store}>
                    <ItemTable items={items} listItems={listItems}/>
                </Provider>
            </BrowserRouter>
        );

        const list = getByRole('ItemTable');
        expect(list).toHaveTextContent(items[0].product.type.name);
        expect(list).toHaveTextContent(items[0].product.brand.name);
        expect(list).toHaveTextContent(items[0].location.name);
    });
});
