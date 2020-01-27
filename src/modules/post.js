import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
    createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as postAPI from '../lib//api/posts';
import { takeLatest } from 'redux-saga/effects';

// const READ_POST = 'post/READ_POST';
// const READ_POST_SUCCESS = 'post/READ_POST_SUCCESS';
// const READ_POST_FAILURE = 'post/READ_POST_FAILURE';

// 액션 타입 선언
const [
    READ_POST,
    READ_POST_SUCCESS,
    READ_POST_FAILURE,
] = createRequestActionTypes('post/READ_POST');
// 포스트 페이지에서 벗어날 때 리덕스 상태의 데이터 비우기
const UNLOAD_POST = 'post/UNLOAD_POST';

// 액션 생성 함수
export const readPost = createAction(READ_POST, id => id);
export const unloadPost = createAction(UNLOAD_POST);

// 사가 함수
const readPostSaga = createRequestSaga(READ_POST, postAPI.readPost);
export function* postSaga() {
    yield takeLatest(READ_POST, readPostSaga);
}

const initialState = {
    post: null,
    error: null,
};

// 리듀서
const post = handleActions(
    {
        [READ_POST_SUCCESS]: (state, { payload: post }) => ({
            ...state,
            post,
        }),
        [READ_POST_FAILURE]: (state, { payload: error }) => ({
            ...state,
            error,
        }),
        [UNLOAD_POST]: () => initialState,
    },
    initialState,
);

export default post;

