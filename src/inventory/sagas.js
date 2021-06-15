import regeneratorRuntime from "regenerator-runtime";
import { take, put, select } from 'redux-saga/effects';
import axios from 'axios';
// import { delay } from 'redux-saga';
import * as mutations from './client';

const url = process.env.NODE_ENV === 'production' ? `` : `http://localhost:4242`;

export function* addItemSaga() {
    while (true) {
        const {item} = yield take(mutations.CREATE_ITEM);

        const {res} = yield axios.post(url + `/item/new`, {
            item: item
        });

        let mutation = mutations.addItem(item);
        alert('mutation' + JSON.stringify(mutation));
        yield put(mutation);
    }
}