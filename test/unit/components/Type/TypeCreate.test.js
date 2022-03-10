import React from "react";
import { getByTestId, render, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import { TypeCreate } from "../../../../src/components/Type/TypeCreate";

describe("TypeCreate component", () => {
    it("Displays create product type form", () => {
        const { getByRole } = render(
            <TypeCreate dispatch={jest.fn()}/>
        );

        const form = getByRole('TypeForm');
        expect(form).toHaveTextContent('Add a Product Type');
    });

    it("Submits type", () => {
        const createType = jest.fn();

        const { getByRole } = render(
            <TypeCreate dispatch={createType}/>
        );

        const form = getByRole('TypeForm');

        fireEvent.input(getByTestId(form, 'typeInput'), { target: { value: 'Tomato Soup' } });
        fireEvent.submit(form);

        expect(createType).toHaveBeenCalledTimes(1);
    });
});