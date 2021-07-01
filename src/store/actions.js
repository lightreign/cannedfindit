import axios from 'axios';
import * as actions from './types';

const qs = require('qs');

const api = axios.create({
    baseURL: '/api',
    timeout: 5000,
});

//// Add a response interceptor
// axios.interceptors.response.use(function (response) {
//     // Any status code that lie within the range of 2xx cause this function to trigger
//     // Do something with response data
//     return response;
//   }, function (error) {
//     // Any status codes that falls outside the range of 2xx cause this function to trigger
//     // Do something with response error
//     return Promise.reject(error);
//   });

export const listBrands = () => {
    return (dispatch) => {
        return api.get('/brand').then(response => {
            return response.data
        }).then(data => {
            dispatch({
                type: actions.LIST_BRANDS,
                brands: data
            });
        }).catch(error => {
            dispatch({
                type: actions.BRAND_ERROR,
                error: error
            });
        });
    };
};

export const listTypes = () => {
    return (dispatch) => {
        return api.get('/type').then(response => {
            return response.data
        }).then(data => {
            dispatch({
                type: actions.LIST_TYPES,
                productTypes: data
            });
        }).catch(error => {
            dispatch({
                type: actions.TYPE_ERROR,
                error: error
            });
        });
    };
};

export const listLocations = () => {
    return (dispatch) => {
        return api.get('/location').then(response => {
            return response.data
        }).then(data => {
            dispatch({
                type: actions.LIST_LOCATIONS,
                locations: data
            });
        }).catch(error => {
            dispatch({
                type: actions.LOCATION_ERROR,
                error: error
            });
        });
    };
};

export const listProducts = () => {
    return (dispatch) => {
        return api.get('/product').then(response => {
            return response.data
        }).then(data => {
            dispatch({
                type: actions.LIST_PRODUCTS,
                products: data
            });
        }).catch(error => {
            dispatch({
                type: actions.PRODUCT_ERROR,
                error: error
            });
        });
    };
};

export const listItems = (perPage, page) => {
    return (dispatch) => {
        return api.get('/item?'+ qs.stringify({page: page, perPage: perPage})).then(response => {
            return response.data
        }).then(data => {
            dispatch({
                type: actions.LIST_ITEMS,
                items: data
            });
        }).catch(error => {
            dispatch({
                type: actions.ITEM_ERROR,
                error: error
            });
        });
    };
};

export const getItem = (id) => {
    return (dispatch) => {
        return api.get('/item/' + id).then(response => {
            return response.data
        }).then(data => {
            dispatch({
                type: actions.GET_ITEM,
                item: data
            });
        }).catch(error => {
            dispatch({
                type: actions.ITEM_ERROR,
                error: error
            });
        });
    };
};

export const getItemsCount = () => {
    return (dispatch) => {
        return api.get('/count/item').then(response => {
            return response.data
        }).then(data => {
            dispatch({
                type: actions.GET_ITEM_COUNT,
                count: data.items
            });
        }).catch(error => {
            dispatch({
                type: actions.ITEM_ERROR,
                error: error
            });
        });
    };
};

export const addBrand = (brand) => {
    return (dispatch) => {
        return api.post('/brand/new', {
            brand: brand
        }).then(response => {
            return response.data
        }).then(data => {
            dispatch({
                type: actions.ADD_BRAND,
                brand: data
            });
        }).catch(error => {
            dispatch({
                type: actions.BRAND_ERROR,
                error: error
            });
        });
    };
};

export const addType = (type) => {
    return (dispatch) => {
        return api.post('/type/new', {
            type: type
        }).then(response => {
            return response.data
        }).then(data => {
            dispatch({
                type: actions.ADD_TYPE,
                productType: data
            });
        }).catch(error => {
            dispatch({
                type: actions.TYPE_ERROR,
                error: error
            });
        });
    };
};

export const addProduct = (product) => {
    return (dispatch) => {
        return api.post('/product/new', {
            product: product
        }).then(response => {
            return response.data
        }).then(data => {
            dispatch({
                type: actions.ADD_PRODUCT,
                product: data
            });
        }).catch(error => {
            dispatch({
                type: actions.PRODUCT_ERROR,
                error: error
            });
        });
    };
};

export const addLocation = (location) => {
    return (dispatch) => {
        return api.post('/location/new', {
            location: location
        }).then(response => {
            return response.data
        }).then(data => {
            dispatch({
                type: actions.ADD_LOCATION,
                item: data
            });
        }).catch(error => {
            dispatch({
                type: actions.LOCATION_ERROR,
                error: error
            });
        });
    };
};

export const addItem = (item) => {
    return (dispatch) => {
        return api.post('/item/new', {
            item: item
        }).then(response => {
            return response.data
        }).then(data => {
            dispatch({
                type: actions.ADD_ITEM,
                item: data
            });
        }).catch(error => {
            dispatch({
                type: actions.ITEM_ERROR,
                data: error.data
            });
        });
    };
};
