import React from "react";
import { Provider } from "react-redux";
import { fireEvent, render } from "@testing-library/react";
import '@testing-library/jest-dom';
import { store, server } from "component-utils";
import { ItemSearch } from "../../../../src/components/Item/ItemSearch";
import { barcodeScanned } from "../../../../src/store/barcodeSlice";

describe("ItemSearch component", () => {
    beforeAll(() => server.listen());
    afterEach(() => server.resetHandlers());
    afterAll(() => server.close());

    it("Searches items", () => {
        const searchItems = jest.fn();
        const changeMode = jest.fn();
        const search = {};

        const { getByRole, getByTestId } = render(
            <Provider store={store}>
                <ItemSearch dispatch={searchItems} changeMode={changeMode} search={search}/>
            </Provider>
        );

        fireEvent.input(getByTestId('search'), { target: { value: 'Beans' } });
        fireEvent.submit(getByRole('SearchForm'));

        expect(searchItems).toHaveBeenCalled();
    });

    it("searches by barcode", () => {
        const searchItems = jest.fn();
        const changeMode = jest.fn();
        const search = {};

        store.dispatch(
            barcodeScanned("5012345678900")
        );

        render(
            <Provider store={store}>
                <ItemSearch dispatch={searchItems} changeMode={changeMode} search={search}/>
            </Provider>
        );

        expect(searchItems).toHaveBeenCalled();
    });
});