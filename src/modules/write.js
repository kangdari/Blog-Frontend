import { createAction, handleActions } from 'redux-actions';

// 액션 타입 선언
const INITIAILIZE = 'write/INITIAILIZE'; // 내용 초기화
const CHANGE_FILED = 'write/CHANGE_FILED'; // 특정 key 바꾸기

// 액션 생성 함수
export const initialize = createAction(INITIAILIZE);
export const changeField = createAction(CHANGE_FILED, ({ key, value }) => ({
    key,
    value,
}));

const initialState = {
    title: '',
    body: '',
    tags: [],
};

// 리듀서
const write = handleActions(
    {
        [INITIAILIZE]: state => initialState, // initialState를 넣으면 초기 상태로 바뀜
        [CHANGE_FILED]: (state, { payload: { key, value } }) => ({
            ...state,
            [key]: value, // 특정 키값을 업데이트
        }),
    },
    initialState,
);

export default write;
