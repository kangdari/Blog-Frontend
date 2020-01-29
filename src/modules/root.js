import { combineReducers } from 'redux';
import loading from './loading';
import { all } from 'redux-saga/effects';
import auth, { authSaga } from './auth';
import user, { userSaga } from './user';
import write, { writeSaga } from './write';
import post, { postSaga } from './post'; // 단일 포스트
import posts, { postsSaga } from './posts'; // 포스트 목록

// 루트 리듀서
const rootReducer = combineReducers({
    auth,
    loading,
    user,
    write,
    post,
    posts,
});

// 루트 사가
export function* rootSaga() {
    // all : 여러 사가를 합쳐줌
    yield all([authSaga(), userSaga(), writeSaga(), postSaga(), postsSaga()]);
}

export default rootReducer;
