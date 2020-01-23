import client from './client';

// proxy 기능을 사용해 백엔드 서버로 요청하고 그 응답을 웹 애플리케이션(프런트엔드)에서 사용하게 해줌

// 로그인
export const login = ({ username, password }) =>
    client.post('/api/auth/login', { username, password });

// 회원가입
export const register = ({ username, password }) =>
    client.post('/api/auth/register', { username, password });

// 로그인 상태 확인
export const check = () => client.get('/api/auth/check');

// 로그아웃
export const logout = () => client.post('api/auth/logout');
