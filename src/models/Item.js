const moment = require('moment');

/**
 * Item model
 */
class Item {
    constructor(item) {
        for (let key in item) {
            // eslint-disable-next-line no-prototype-builtins
            if (item.hasOwnProperty(key)) {
                this[key] = item[key];
            }
        }

        this.expiry = new Date(this.expiry);
    }

    expiryAsString() {
        return this.expiry.toLocaleDateString();
    }

    isExpired() {
        return this.expiry <= moment();
    }

    expiringVerySoon() {
        return this.expiry <= moment().add(1, 'month');
    }

    expiringSoon() {
        return this.expiry <= moment().add(3, 'month');
    }
}

export default Item;