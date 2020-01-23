import { createAction, handleActions } from 'redux-actions';
import { takeLatest, call } from 'redux-saga/effects';
import createRequestSaga from '../lib/createRequestSaga';
import * as authAPI from '../lib/api/auth';

// 액션 타입 선언
const TEMP_SET_USER = 'user/TEMP_SET_USER'; // 새로고침 이후 임시 로그인 처리
// 회원 정보 확인
const CHECK = 'user/CHECK';
const CHECK_SUCCESS = 'user/CHECK_SUCCESS';
const CHECK_FAILURE = 'user/CHECK_FAILURE';
const LOGOUT = 'user/LOGOUT'; // 로그아웃 액션

// 액션 생성 함수
export const tempSetUser = createAction(TEMP_SET_USER, user => user);
export const check = createAction(CHECK);
export const logout = createAction(LOGOUT);

// redux-saga 생성 (action type, func) API 함수 호출
const checkSaga = createRequestSaga(CHECK, authAPI.check); // 제너레이션 함수 반환

function checkFailureSaga() {
    try {
        localStorage.removeItem('user');
    } catch (e) {
        console.log('localStorage is not working');
    }
}

function* logoutSaga() {
    try {
        yield call(authAPI.logout); // logout API 호출
        localStorage.removeItem('user');
    } catch (e) {
        console.log(e);
    }
}

// 제너레이션 함수 = Saga
export function* userSaga() {
    // (action type, 특정 작업)
    yield takeLatest(CHECK, checkSaga); // 가장 마지막 실행된 작업만 실행
    yield takeLatest(CHECK_FAILURE, checkFailureSaga); // CHECK_FAILURE 액션 발생 시 localStorage의 user값을 초기화
    yield takeLatest(LOGOUT, logoutSaga); // LOGOUT 액션 발생 시 logoutSaga 호출
}

const initialState = {
    user: null,
    checkError: null,
};

// reducer
// 스토어의 상태가 변화
export default handleActions(
    {
        [TEMP_SET_USER]: (state, { payload: user }) => ({
            ...state,
            user,
        }),
        [CHECK_SUCCESS]: (state, { payload: user }) => ({
            ...state,
            user,
            checkError: null,
        }),
        [CHECK_FAILURE]: (state, { payload: error }) => ({
            ...state,
            user: null,
            checkError: error,
        }),
        [LOGOUT]: state => ({
            ...state,
            user: null,
        }),
    },
    initialState,
);
