import React from "react";
import { Provider } from "react-redux";
import { fireEvent, render } from "@testing-library/react";
import '@testing-library/jest-dom';
import { store, server } from "component-utils";
import { ItemSearch } from "../../../../src/components/Item/ItemSearch";

describe("ItemSearch component", () => {
    beforeAll(() => server.listen());
    afterEach(() => server.resetHandlers());
    afterAll(() => server.close());

    it("Searches items", () => {
        const searchItems = jest.fn();

        const { getByRole, getByTestId } = render(
            <Provider store={store}>
                <ItemSearch dispatch={searchItems}/>
            </Provider>
        );

        fireEvent.input(getByTestId('search'), { target: { value: 'Beans' } });
        fireEvent.submit(getByRole('SearchForm'));

        expect(searchItems).toHaveBeenCalled();
    });
});