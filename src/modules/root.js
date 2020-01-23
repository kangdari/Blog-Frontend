import { combineReducers } from 'redux';
import loading from './loading';
import { all } from 'redux-saga/effects';
import auth, { authSaga } from './auth';
import user, { userSaga } from './user';
import write from './write';

const rootReducer = combineReducers({ auth, loading, user, write });

// rootSaga
export function* rootSaga() {
    // all : 여러 사가를 합쳐줌
    yield all([authSaga(), userSaga()]);
}

export default rootReducer;
