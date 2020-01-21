import { combineReducers } from 'redux';
import auth from './auth';
import loading from './loading';
import { all } from 'redux-saga/effects';
import { authSaga } from './auth';

const rootReducer = combineReducers({ auth, loading });

// rootSaga
export function* rootSaga(){
    // all : 여러 사가를 합쳐줌
    yield all([authSaga()]);
}

export default rootReducer;
