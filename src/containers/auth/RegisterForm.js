// 리덕스와 연동을 위한 컨테이너 컴포넌트
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeField, initializeForm, register } from '../../modules/auth'; // 액션 생성 함수
import AuthForm from '../../components/auth/AuthForm';
import { check } from '../../modules/user';
import { withRouter } from 'react-router-dom';

const RegisterForm = ({ history }) => {
    // 에러 상태 처리를 위한 useState
    const [error, setError] = useState(null);
    // 에러 발생 경우
    // username, password, passwordConfirm 중 하나라도 비어 있을 때
    // password와 passwordConfirm 값이 일치하지 않을 때
    // username이 중복될 때

    const dispatch = useDispatch();
    const { form, auth, authError, user } = useSelector(({ auth, user }) => ({
        // state.auth.~
        form: auth.register,
        auth: auth.auth,
        authError: auth.authError,
        user: user.user,
    }));

    // 인풋 변경 인벤트 핸들러
    const onChange = e => {
        const { value, name } = e.target;
        // console.log(e.target);
        // dispatch 호출 시 스토어는 리듀서 함수 실행
        dispatch(
            changeField({
                form: 'register',
                key: name,
                value,
            }),
        );
    };

    // 폼 등록 이벤트 핸들러
    const onSubmit = e => {
        e.preventDefault();
        const { username, password, passwordConfirm } = form;
        // username, password, passwordConfirm 중 하나라도 비어 있을 때
        if ([username, password, passwordConfirm].includes('')) {
            setError('빈 칸을 모두 입력하세요.');
            return;
        }
        // password와 passwordConfirm 값이 일치하지 않을 때
        if (password !== passwordConfirm) {
            setError('비밀번호가 일치하지 않습니다.');
            return;
        }
        // 액션 디스패치 > 액션 생성함수 실행
        dispatch(register({ username, password }));
    };

    // 컴포넌트가 처음 렌더링될 때 form을 초기화
    useEffect(() => {
        dispatch(initializeForm('register'));
    }, [dispatch]);

    // 회원가입 성공 / 실패 처리
    useEffect(() => {
        if (authError) {
            // username이 중복될 때
            if (authError.response.status === 409) {
                // Confict
                setError('이미 존재하는 계정입니다.');
                return;
            }
            // 기타 이유
            setError('회원가입 실패');
            return;
        }
        if (auth) {
            // console.log('회원가입 성공');
            dispatch(check()); // check 액션 생성 함수 디스패치
        }
    }, [auth, authError, dispatch]);

    // user 값이 잘 설정되었는지 확인
    useEffect(() => {
        if (user) {
            history.push('/'); // 홈 화면 이동
            // console.log('check API 성공');
            // console.log(user);
        }
    }, [history, user]);

    // 렌더링
    return (
        <AuthForm
            type="register"
            form={form}
            onChange={onChange}
            onSubmit={onSubmit}
            error={error}
        />
    );
};

export default withRouter(RegisterForm);
