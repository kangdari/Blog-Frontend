import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';

// 액션 타입 선언
const CHANGE_FILED = 'auth/CHANGE_FILED';
const INITIALIZE_FORM = 'auth/INITIALIZE_FORM';

// 액션 생성 함수
export const changeField = createAction(
    CHANGE_FILED,
    ({ form, key, value }) => ({
        form, // register, login
        key, // username, password, passwordConfirm
        value, // 실제 바꾸려는 값
    }),
);
export const initializeForm = createAction(INITIALIZE_FORM, form => form); // register, login

// 초기 상태 설정
const initialState = {
    register: {
        username: '',
        password: '',
        passwordConfirm: '',
    },
    login: {
        username: '',
        password: '',
    },
};

// 리듀서
const auth = handleActions(
    {
        // 파라미터 값들은 payload 사용 
        [CHANGE_FILED]: (state, { payload: { form, key, value } }) =>
            // immer 적용
            produce(state, draft => {
                draft[form][key] = value; // ex: state.register.username을 바꿈.
            }),
        [INITIALIZE_FORM]: (state, { payload: form }) => ({
            ...state,
            [form]: initialState[form],
        }),
    },
    initialState,
);

export default auth;
