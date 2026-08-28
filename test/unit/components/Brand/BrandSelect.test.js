import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { BrandSelect } from "../../../../src/components/Brand/BrandSelect";

describe("BrandSelect component", () => {
    const brands = [ { _id: '1', name: 'Kirkland' }, { _id: '2', name: 'Crowfield' }];

    it("Displays and selects brand", () => {
        const selectBrand = jest.fn();
        const listBrands = jest.fn(() => brands);

        const { getByTestId, getByRole } = render(
            <BrandSelect brands={brands} listBrands={listBrands} setProductBrand={selectBrand}/>
        );

        const select = getByTestId('brandSelect');

        fireEvent.focus(select);
        fireEvent.click(getByRole('option', {name: brands[0].name}));

        expect(selectBrand).toBeCalledTimes(1);
        expect(listBrands).toBeCalled();
    });
});