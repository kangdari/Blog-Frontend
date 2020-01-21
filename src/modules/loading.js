import { createAction, handleActions } from 'redux-actions';

// 액션 타입 선언
const START_LOADING = 'loading/START_LOADING';
const FINISH_LOADING = 'loading/FINISH_LOADING';

// 요청을 위한 액션 타입을 payload로 설정

// 액션 생성 함수
export const startLoading = createAction(
    START_LOADING,
    reqeustType => reqeustType,
);
export const finishLoading = createAction(
    FINISH_LOADING,
    reqeustType => reqeustType,
);

const initialState = {};

// 리듀서
const loading = handleActions(
    {
        [START_LOADING]: (state, action) => ({
            ...state,
            [action.payload]: true, // 로딩 중...
        }),
        [FINISH_LOADING]: (state, action) => ({
            ...state,
            [action.payload]: false, // 로딩 끝
        }),
    },
    initialState,
);

export default loading;