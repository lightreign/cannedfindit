import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { TypeSelect } from "../../../../src/components/Type/TypeSelect";

describe("TypeSelect component", () => {
    const types = [ { _id: '1', name: 'Crackers' }, { _id: '2', name: 'Baked Beans' }];

    it("Displays and selects product type", () => {
        const selectType = jest.fn();
        const listTypes = jest.fn(() => types);

        const { getByTestId, getByRole } = render(
            <TypeSelect types={types} listTypes={listTypes} setProductType={selectType}/>
        );

        const select = getByTestId('typeSelect');

        fireEvent.change(select, { target: { value: types[0].name } });
        expect(getByRole('option', {name: types[0].name}).selected).toBe(true);

        expect(selectType).toBeCalledTimes(1);
        expect(listTypes).toBeCalled();
    });
});