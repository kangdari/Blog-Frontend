import { combineReducers } from 'redux';
import loading from './loading';
import { all } from 'redux-saga/effects';
import auth, { authSaga } from './auth';
import user, { userSaga } from './user';
import write, { writeSaga } from './write';
import post, { postSaga } from './post';

// 루트 리듀서
const rootReducer = combineReducers({ auth, loading, user, write, post });

// 루트 사가
export function* rootSaga() {
    // all : 여러 사가를 합쳐줌
    yield all([authSaga(), userSaga(), writeSaga(), postSaga()]);
}

export default rootReducer;
