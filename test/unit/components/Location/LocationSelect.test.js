import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { LocationSelect } from "../../../../src/components/Location/LocationSelect";

describe("LocationSelect component", () => {
    const locations = [ { _id: '1', name: 'Garage' }, { _id: '2', name: 'Basement' }];

    it("Displays and selects location", () => {
        const selectLocation = jest.fn();
        const listLocations = jest.fn(() => locations);

        const { getByTestId, getByRole } = render(
            <LocationSelect locations={locations} listLocations={listLocations} setLocation={selectLocation}/>
        );

        const select = getByTestId('locationSelect');

        fireEvent.change(select, { target: { value: locations[0].name } });
        expect(getByRole('option', {name: locations[0].name}).selected).toBe(true);

        expect(selectLocation).toBeCalledTimes(1);
        expect(listLocations).toBeCalled();
    });
});