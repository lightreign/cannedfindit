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
                type: actions.API_ERROR,
                error: error,
                userMessage: 'Cannot list brands due to server error',
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
                type: actions.API_ERROR,
                error: error,
                userMessage: 'Cannot list product types due to server error',
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
                type: actions.API_ERROR,
                error: error,
                userMessage: 'Cannot list locations due to server error',
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
                type: actions.API_ERROR,
                error: error,
                userMessage: 'Cannot list products',
            });
        });
    };
};

export const listItems = (search = '', page = null, perPage = null) => {
    return (dispatch, getState) => {
        const state = getState();

        search = search || state.pager.filter;
        page = page ||  state.pager.page;
        perPage = perPage || state.pager.perPage;

        const params = {search: search, page: page, perPage: perPage};

        return api.get('/item?'+ qs.stringify(params)).then(response => {
            return response
        }).then(response => {
            dispatch({
                type: actions.LIST_ITEMS,
                items: response.data,
            });

            dispatch({
                type: actions.UPDATE_PAGER,
                filter: search,
                page: page,
                perPage: perPage,
                itemCount: response.headers['x-total-count'],
            });
        }).catch(error => {
            dispatch({
                type: actions.API_ERROR,
                error: error,
                userMessage: 'Cannot list inventory items due to server error',
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
                type: actions.API_ERROR,
                error: error,
                userMessage: 'Cannot display inventory item due to server error',
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

            dispatch({
                type: actions.NOTIFY_SUCCESS,
                message: 'Brand created successfully',
            });
        }).catch(error => {
            dispatch({
                type: actions.API_ERROR,
                error: error,
                userMessage: 'Cannot add product brand, does it already exist?',
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

            dispatch({
                type: actions.NOTIFY_SUCCESS,
                message: 'Product type created successfully',
            });
        }).catch(error => {
            dispatch({
                type: actions.API_ERROR,
                error: error,
                userMessage: 'Cannot add product type, does it already exist?',
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

            dispatch({
                type: actions.NOTIFY_SUCCESS,
                message: 'Product created successfully',
            });

        }).catch(error => {
            dispatch({
                type: actions.API_ERROR,
                error: error,
                userMessage: 'Cannot add product, either it already exists or there was a server error',
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
                location: data
            });

            dispatch({
                type: actions.NOTIFY_SUCCESS,
                message: 'Location created successfully',
            });
        }).catch(error => {
            dispatch({
                type: actions.API_ERROR,
                error: error,
                userMessage: 'Cannot add item location, does it already exist?',
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

            dispatch({
                type: actions.NOTIFY_SUCCESS,
                message: 'Item added successfully',
            });
        }).catch(error => {
            dispatch({
                type: actions.API_ERROR,
                data: error.data
            });
        });
    };
};
