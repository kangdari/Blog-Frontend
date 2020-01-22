// 리덕스와 연동을 위한 컨테이너 컴포넌트
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeField, initializeForm, login } from '../../modules/auth';
import AuthForm from '../../components/auth/AuthForm';
import { check } from '../../modules/user';
import { withRouter } from 'react-router-dom';

const LoginForm = ({ history }) => {
    const dispatch = useDispatch();
    const { form, auth, authError, user } = useSelector(({ auth, user }) => ({
        form: auth.login,
        auth: auth.auth,
        authError: auth.authError,
        user: user.user,
    }));

    // 인풋 변경 인벤트 핸들러
    const onChange = e => {
        const { value, name } = e.target;
        // dispatch 호출 시 스토어는 리듀서 함수 실행
        dispatch(
            changeField({
                form: 'login',
                key: name,
                value,
            }),
        );
    };

    // 폼 등록 이벤트 핸들러
    const onSubmit = e => {
        e.preventDefault();
        const { username, password } = form;
        dispatch(login({ username, password }));
    };

    // 컴포넌트가 처음 렌더링될 때 form을 초기화
    useEffect(() => {
        dispatch(initializeForm('login'));
    }, [dispatch]);

    // 로그인 성공 / 실패 처리
    useEffect(() => {
        if (authError) {
            console.log('오류 발생');
            console.log(authError);
            return;
        }
        if (auth) {
            console.log('로그인 성공');
            console.log(auth);
            dispatch(check());
        }
    }, [auth, authError, dispatch]);

    useEffect(() => {
        if (user) {
            history.push('/');
        }
    }, [history, user]);

    // 렌더링
    return (
        <AuthForm
            type="login"
            form={form}
            onChange={onChange}
            onSubmit={onSubmit}
        />
    );
};

export default withRouter(LoginForm);
