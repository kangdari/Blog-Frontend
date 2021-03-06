import { call, put } from 'redux-saga/effects';
import { startLoading, finishLoading } from '../modules/loading';

export function createRequestActionTypes(type) {
    const SUCCESS = `${type}_SUCCESS`;
    const FAILURE = `${type}_FAILURE`;
    return [type, SUCCESS, FAILURE];
};

// request = API 함수
export default function createRequestSaga(type, request) {
    const SUCCESS = `${type}_SUCCESS`;
    const FAILURE = `${type}_FAILURE`;

    // generation 함수 사용
    // action은 각 모듈의 action 타입
    return function*(action) {
        yield put(startLoading(type)); // 로딩 시작
        try {
            // call(fn, ...args) 함수 fn를 args 인수로 호출
            // request > 백엔드 서버에서 수행되는 작업. register, check ...
            const response = yield call(request, action.payload);
            // put : dispatch >>  액션 발생시키는 것 > 이후 reducer 실행
            yield put({
                // type_SUCCESS 액션 실행
                type: SUCCESS,
                payload: response.data,
                // response를 통해 HTTP 헤더 및 상태 코드를 조회 가능
                meta: response,
            });
        } catch (e) {
            yield put({
                type: FAILURE,
                payload: e,
                error: true,
            });
        }
        yield put(finishLoading(type)); // 로딩 끝
    };
}
