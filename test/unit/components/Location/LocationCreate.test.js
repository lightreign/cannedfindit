import React from "react";
import { getByTestId, render, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import { LocationCreate } from "../../../../src/components/Location/LocationCreate";

describe("LocationCreate component", () => {
    it("Displays create location form", () => {
        const { getByRole } = render(
            <LocationCreate dispatch={jest.fn()}/>
        );

        const form = getByRole('LocationForm');
        expect(form).toHaveTextContent('Create an Item Location');
    });

    it("Submits location", () => {
        const createLocation = jest.fn();

        const { getByRole } = render(
            <LocationCreate dispatch={createLocation}/>
        );

        const form = getByRole('LocationForm');

        fireEvent.input(getByTestId(form, 'locationInput'), { target: { value: 'Garage' } });
        fireEvent.submit(form);

        expect(createLocation).toHaveBeenCalledTimes(1);
    });
});