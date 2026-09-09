import React from "react";
import { Provider } from "react-redux";
import { getByTestId, render, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import { store, server, getPreloadedState } from "component-utils";
import { ProductCreate } from "../../../../src/components/Product/ProductCreate";
import { barcodeScanned } from "../../../../src/store/barcodeSlice";

describe("ProductCreate component", () => {
    beforeAll(() => server.listen());
    afterEach(() => server.resetHandlers());
    afterAll(() => server.close());

    it("Displays create product form", () => {
        const { getByRole } = render(
            <Provider store={store}>
                <ProductCreate dispatch={jest.fn()}/>
            </Provider>
        );

        const form = getByRole('ProductForm');
        expect(form).toHaveTextContent('Add a Product');
    });

    it("Submits product", () => {
        const preloadedState = getPreloadedState();

        const createProduct = jest.fn(dispatched =>
            expect(dispatched.toString()).toContain('actions.ADD_PRODUCT')
        );

        const { getByRole } = render(
            <Provider store={store}>
                <ProductCreate dispatch={createProduct}/>
            </Provider>
        );

        const form = getByRole('ProductForm');
        const typeSelect = getByTestId(form, 'typeSelect');
        const brandSelect = getByTestId(form, 'brandSelect');

        fireEvent.change(typeSelect, { target: { value: preloadedState.types[0].name } });

        fireEvent.focus(brandSelect);
        fireEvent.click(getByRole('option', {name: preloadedState.brands[0].name}));

        fireEvent.input(getByTestId(form, 'massInput'), { target: { value: '330' } });
        fireEvent.change(getByTestId(form, 'unitSelect'), { target: { value: 'g' } });
        fireEvent.submit(form);

        expect(createProduct).toHaveBeenCalledTimes(1);
    });

    it("Submits product with barcode", () => {
        const preloadedState = getPreloadedState();

        const dispatcher = jest.fn(dispatched => {
            if (typeof dispatched === 'object') {
                expect(dispatched.type).toEqual('barcode/clearBarcode');
                return;
            }

            expect(dispatched.toString()).toContain('actions.ADD_PRODUCT')
        });

        store.dispatch(
            barcodeScanned("5012345678900")
        );

        const { getByRole } = render(
            <Provider store={store}>
                <ProductCreate dispatch={dispatcher}/>
            </Provider>
        );

        const form = getByRole('ProductForm');
        const typeSelect = getByTestId(form, 'typeSelect');
        const brandSelect = getByTestId(form, 'brandSelect');

        fireEvent.change(typeSelect, { target: { value: preloadedState.types[0].name } });

        fireEvent.focus(brandSelect);
        fireEvent.click(getByRole('option', {name: preloadedState.brands[0].name}));

        fireEvent.input(getByTestId(form, 'massInput'), { target: { value: '330' } });
        fireEvent.change(getByTestId(form, 'unitSelect'), { target: { value: 'g' } });
        fireEvent.submit(form);

        expect(dispatcher).toHaveBeenCalledTimes(2);
    });
});