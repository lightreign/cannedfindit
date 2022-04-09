import api from "./api";
import * as actions from './types';
import { store } from "./index";

const qs = require('qs');

api.interceptors.request.use(function (config) {
    store.dispatch(clearNotifications());
    return config;
}, function (error) {
    return Promise.reject(error);
});

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

export const listProductItems = (search, page = null, perPage = null) => {
    return (dispatch, getState) => {
        const state = getState();

        const params = {
            page: page || state.pagers.productItem.page,
            perPage: perPage || state.pagers.productItem.perPage
        };

        return api.get('/product/item/count?' + qs.stringify(params)).then(response => {
            return response
        }).then(response => {
            dispatch({
                type: actions.LIST_PRODUCT_ITEM_COUNT,
                productItems: response.data,
            });

            dispatch({
                type: actions.UPDATE_PAGER,
                pager: 'productItem',
                filter: search,
                page: page,
                perPage: perPage,
                total: response.headers['x-total-count'],
            });

        }).catch(error => {
            dispatch({
                type: actions.API_ERROR,
                error: error,
                userMessage: 'Cannot list product item counts',
            });
        });
    };
};

export const listItems = (search = '', page = null, perPage = null) => {
    return (dispatch, getState) => {
        const state = getState();

        search = search || state.pagers.item.filter;
        page = page ||  state.pagers.item.page;
        perPage = perPage || state.pagers.item.perPage;

        const params = { search: search, page: page, perPage: perPage };

        return api.get('/item?'+ qs.stringify(params)).then(response => {
            return response
        }).then(response => {
            dispatch({
                type: actions.LIST_ITEMS,
                items: response.data,
            });

            dispatch({
                type: actions.UPDATE_PAGER,
                pager: 'item',
                filter: search,
                page: page,
                perPage: perPage,
                total: response.headers['x-total-count'],
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
                userMessage: 'Item does not exist or there was an error retrieving the item',
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

export const addItem = (item, qty) => {
    return (dispatch) => {
        return api.post('/item/new', {
            item: item,
            qty: qty,
        }).then(response => {
            return response.data
        }).then(data => {
            dispatch({
                type: actions.ADD_ITEMS,
                items: data
            });

            dispatch({
                type: actions.NOTIFY_SUCCESS,
                message: (data.length > 1 ? 'Items' : 'Item' ) + ' added successfully',
            });
        }).catch(error => {
            dispatch({
                type: actions.API_ERROR,
                error: error,
            });
        });
    };
};

export const addErrorNotification = (errMessage) => {
    return (dispatch) => {
        dispatch({
            type: actions.NOTIFY_ERROR,
            userMessage: errMessage
        });
    }
};

export const clearNotifications = () => {
    return (dispatch) => {
        dispatch({
            type: actions.CLEAR_NOTIFICATIONS
        });
    };
};

export const consumeItem = (id) => {
    return (dispatch) => {
        return api.post('/item/consume', {
            id: id
        }).then(response => {
            return response.data
        }).then(data => {
            dispatch({
                type: actions.CONSUME_ITEM,
                item: data
            });

            dispatch({
                type: actions.NOTIFY_SUCCESS,
                message: 'Item consumed, yum yum'
            });
        }).catch(error => {
            dispatch({
                type: actions.API_ERROR,
                error: error,
                userMessage: 'Cannot consume item due to error',
            });
        });
    };
}

export const unconsumeItem = (id) => {
    return (dispatch) => {
        return api.post('/item/unconsume', {
            id: id
        }).then(response => {
            return response.data
        }).then(data => {
            dispatch({
                type: actions.UNCONSUME_ITEM,
                item: data
            });

            dispatch({
                type: actions.NOTIFY_SUCCESS,
                message: 'Item was unconsumed, phew!'
            });
        }).catch(error => {
            dispatch({
                type: actions.API_ERROR,
                error: error,
                userMessage: 'Cannot unconsume item due to error, oh dear',
            });
        });
    };
}

export const getUser = (id) => {
    return (dispatch) => {
        return api.get('/user/' + id).then(response => {
            return response.data
        }).then(data => {
            dispatch({
                type: actions.GET_USER,
                user: data
            });
        }).catch(error => {
            dispatch({
                type: actions.API_ERROR,
                error: error,
                userMessage: 'Unable to get user details',
            });
        });
    };
}

export const updateUser = (user) => {
    return (dispatch) => {
        return api.put('/user', {
            user: user
        }).then(response => {
            return response.data
        }).then(data => {
            dispatch({
                type: actions.UPDATE_USER,
                user: data
            });

            dispatch({
                type: actions.NOTIFY_SUCCESS,
                message: 'User was updated'
            });
        }).catch(error => {
            dispatch({
                type: actions.API_ERROR,
                error: error,
                userMessage: 'Unable to update User, is the server down?',
            });
        });
    };
}