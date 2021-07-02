import React from "react";

export const ItemExpiry = ({item}) => (
    <div>{item.expiry.toLocaleDateString()}</div>
);

