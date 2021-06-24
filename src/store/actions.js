import axios from 'axios';
import * as actions from './types';

const url = process.env.NODE_ENV === 'production' ? `/api` : `http://localhost:4242/api`;

export const listBrands = () => {
    return (dispatch) => {
        return axios.get(url + `/brand`).then(response => {
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
        return axios.get(url + `/type`).then(response => {
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
        return axios.get(url + `/location`).then(response => {
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
        return axios.get(url + `/product`).then(response => {
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

export const listItems = () => {
    return (dispatch) => {
        return axios.get(url + `/item`).then(response => {
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

export const addBrand = (brand) => {
    return (dispatch) => {
        return axios.post(url + `/brand/new`, {
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
        return axios.post(url + `/type/new`, {
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
        return axios.post(url + `/product/new`, {
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
        return axios.post(url + `/location/new`, {
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
        return axios.post(url + `/item/new`, {
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
