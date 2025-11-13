export const defaultState = {
    version: "1.5.0",
    user: {},
    pagers: {
        item: {
            filter: {},
            page: 1,
            perPage: 20,
            total: 0,
        },
        productItem: {
            filter: {},
            page: 1,
            perPage: 20,
            total: 0,
        }
    },
    brands: [],
    types: [],
    products: [],
    productItems: [],
    items: [],
    item: {},
    locations: [],
    notification: {
        notification: '',
        type: null,
        variant: null
    },
};