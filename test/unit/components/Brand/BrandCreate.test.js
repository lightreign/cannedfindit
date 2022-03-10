import React from "react";
import { getByTestId, render, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import { BrandCreate } from "../../../../src/components/Brand/BrandCreate";

describe("BrandCreate component", () => {
    it("Displays create brand form", () => {
        const { getByRole } = render(
            <BrandCreate dispatch={jest.fn()}/>
        );

        const form = getByRole('BrandForm');
        expect(form).toHaveTextContent('Create a Product Brand');
    });

    it("Submits brand", () => {
        const createBrand = jest.fn();

        const { getByRole } = render(
            <BrandCreate dispatch={createBrand}/>
        );

        const form = getByRole('BrandForm');

        fireEvent.input(getByTestId(form, 'brandInput'), { target: { value: 'campbells' } });
        fireEvent.submit(form);

        expect(createBrand).toHaveBeenCalledTimes(1);
    });
});