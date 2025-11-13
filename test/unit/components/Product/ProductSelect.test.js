import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { ProductSelect } from "../../../../src/components/Product/ProductSelect";
import { getPreloadedState } from "../../../utils/component-utils";

describe("ProductSelect component", () => {
    const products = getPreloadedState().products;

    it("displays and selects product", () => {
        const selectProduct = jest.fn();
        const listProducts = jest.fn(() => products);

        const { getByTestId, getByRole } = render(
            <ProductSelect products={products} listProducts={listProducts} setProduct={selectProduct}/>
        );

        const select = getByTestId('productSelect');
        const productOption = products[0].brand.name + ' ' + products[0].type.name + ' ' + products[0].weight + 'g';

        fireEvent.focus(select);
        fireEvent.click(getByRole('option', {name: productOption}));

        expect(selectProduct).toBeCalledTimes(1);
        expect(listProducts).toBeCalled();
    });
});