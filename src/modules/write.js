import { createAction, handleActions } from 'redux-actions';
import createRequestSaga from '../lib/createRequestSaga';
import * as postAPI from '../lib/api/posts';
import { takeLatest } from 'redux-saga/effects';

// 액션 타입 선언
const INITIAILIZE = 'write/INITIAILIZE'; // 내용 초기화
const CHANGE_FILED = 'write/CHANGE_FILED'; // 특정 key 바꾸기
// 포스트 작성
const WRITE_POST = 'write/WRITE_POST';
const WRITE_POST_SUCCESS = 'write/WRITE_POST_SUCCESS';
const WRITE_POST_FAILURE = 'write/WRITE_POST_FAILURE';

// 액션 생성 함수, container 컴포넌트에서 함수 디스패치하여 사용
export const initialize = createAction(INITIAILIZE);
export const changeField = createAction(CHANGE_FILED, ({ key, value }) => ({
    key,
    value,
}));
export const writePost = createAction(WRITE_POST, ({ title, body, tags }) => ({
    title,
    body,
    tags,
}));

// 사가 생성
// request = API 함수
const writePostSaga = createRequestSaga(WRITE_POST, postAPI.writePost);
export function* writeSaga() {
    yield takeLatest(WRITE_POST, writePostSaga);
}

const initialState = {
    title: '',
    body: '',
    tags: [],
    post: null,
    postError: null,
};

// 리듀서
const write = handleActions(
    {
        [INITIAILIZE]: state => initialState, // initialState를 넣으면 초기 상태로 바뀜
        [CHANGE_FILED]: (state, { payload: { key, value } }) => ({
            ...state,
            [key]: value, // 특정 키 값을 업데이트 , 키 값은 body, title
            // body: 'value' or title: 'value'
        }),
        // post, postError 초기화
        [WRITE_POST]: state => ({
            ...state,
            post: null,
            postError: null,
        }),
        // 포스트 작성 성공
        [WRITE_POST_SUCCESS]: (state, { payload: post }) => ({
            ...state,
            post,
        }),
        // 포스트 작성 실패
        [WRITE_POST_FAILURE]: (state, { payload: postError }) => ({
            ...state,
            postError,
        }),
    },
    initialState,
);

export default write;
