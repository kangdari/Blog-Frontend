import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer, { rootSaga } from './modules/root';
import createSagaMiddleware from 'redux-saga';
import { tempSetUser, check } from './modules/user';

// redux-saga 적용
const sagaMiddleware = createSagaMiddleware();
const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(sagaMiddleware)),
);

function loadUser() {
    try {
        // 로그인, 회원가입 시 localStorage에 저장한 값을 가져옴
        const user = localStorage.getItem('user');
        if (!user) return; // 로그인 상태가 아니면 리턴

        store.dispatch(tempSetUser(user)); // 임시 로그인 상태??
        store.dispatch(check(user)); // 사용자가 로그인 상태인지 체크
    } catch (e) {
        console.log('localStorage is not working');
    }
}

sagaMiddleware.run(rootSaga);
// sagaMiddleware.run이 호출된 이후에 loadUser 호출
// CHECK 액션을 디스패치했을 때 사가에서 이를 제대로 처리하기 위해서
loadUser();

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root'),
);

serviceWorker.unregister();
