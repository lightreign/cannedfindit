import axios from 'axios';
import * as actions from './types';

const url = process.env.NODE_ENV === 'production' ? `` : `http://localhost:4242`;

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
                type: actions.ERROR,
                data: error
            });
        });
    };
};