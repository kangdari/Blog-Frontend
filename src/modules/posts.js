import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
    createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as postAPI from '../lib/api/posts';
import { takeLatest } from 'redux-saga/effects';

// 액션 타입 선언
const [
    LIST_POSTS,
    LIST_POSTS_SUCCESS,
    LIST_POSTS_FAILURE,
] = createRequestActionTypes('posts/LIST_POSTS');
// 액션 생성 함수
export const listPosts = createAction(
    LIST_POSTS,
    ({ tag, username, page }) => ({
        tag,
        username,
        page,
    }),
);
// 사가 생성
const listPostSaga = createRequestSaga(LIST_POSTS, postAPI.listPosts);
export function* postsSaga() {
    yield takeLatest(LIST_POSTS, listPostSaga);
}
// 초기 상태 설정
const initialState = {
    posts: null,
    error: null,
    lastPage: 1,
};
// 리듀서
const posts = handleActions(
    {
        [LIST_POSTS_SUCCESS]: (state, { payload: posts, meta: response }) => ({
            ...state,
            posts,
            lastPage: parseInt(response.header['last-page'], 10), // 문자열 숫자로 변환, 10 = 10진수
        }),
        [LIST_POSTS_FAILURE]: (state, { payload: error }) => ({
            ...state,
            error,
        }),
    },
    initialState,
);

export default posts;
