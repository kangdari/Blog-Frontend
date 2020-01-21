import { createAction, handleActions, handleAction } from 'redux-actions';

// 액션 타입 선언
const SAMPLE_ACTION = 'auth/SAMPLE_ACTION';

// 액션 생성 함수
export const sampleAction = createAction(SAMPLE_ACTION);

// 초기 상태 설정
const initialState = {};

// 리듀서 
const auth = handleActions({
    [SAMPLE_ACTION] : (state, action) => state,
}, initialState);

export default auth;