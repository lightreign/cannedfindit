import React from "react";

export const ItemExpiry = ({item, label=''}) => {
    let expiryClass = '';

    if (item.isExpired()) {
        expiryClass = 'text-danger';
    } else if (item.expiringVerySoon()) {
        expiryClass = 'text-warning';
    } else if (item.expiringSoon()) {
        expiryClass = 'text-info';
    }

    return (
        <div className={expiryClass}>{label} {item.expiryDateString()}</div>
    );
}

