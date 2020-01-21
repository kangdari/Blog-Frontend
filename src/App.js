import React from 'react';
import { Route } from 'react-router-dom';
import PostListPage from './pages/PostListPage';
import PostPage from './pages/PostPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import WritePage from './pages/WritePage';

function App() {
  return (
    <>
      {/* [] path를 배열 형태로 넣어 줌. 한 라우트 컴포넌트에서 여러 개의 경로를 설정 가능 */}
      <Route component={PostListPage} path={['/@:username', '/']} exact />
      <Route component={PostPage} path={'/@:username/:postId'} />
      <Route component={LoginPage} path={'/login'} />
      <Route component={RegisterPage} path={'/register'} />
      <Route component={WritePage} path={'/write'} />
    </>
  );
}

export default App;
