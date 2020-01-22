## Blog-Fronted

리액트 프로젝트를 생성하여 Koa 프레임워크로 만든 서버에 연동하여 작업.

### 디렉토리 정리

● src

    components

        auth

            AuthForm.js // 회원가입 or 로그인 form 을 보여줌.

            AuthTemplate.js // 회원가입 or 로그인 레이아웃 담당

        base

            Header.js //

        common    

            Button.js // 공통으로 사용되는 Button UI

            Responsive.js // 반응형 디자인을 위한 컴포넌트로 다양한 컴포넌트에서 사용 예정

    containers // 리덕스와 연동을 위한 컴포넌트

        auth

            LoginForm.js // 로그인 컨테이너 컴포넌트

            RegisterFrom.js // 회원가입 컨테이너 컴포넌트

    lib

        api

            auth.js // API 함수 작성, 프록시로 정해 둔 백엔드 서버에 전달 예정

            client.js // axios 인스턴스 생성
        
        styles

            pallet.js // 컴포넌트 꾸밈에 사용될 색상
        
        createRequestSaga.js // redux-saga 생성 : 특정 액션이 디스패치되었을 때 정해진 로직에 따른 액션을 디스패치 시키는 규칙을 작성하여 비동기 작업 처리
        
            put : redux의 dispatch 함수와 동일, 결과를 스토어에 dispatch > reducer 실행

            call : call(fn, ...args) 함수 fn를 args 인수로 호출

    modules // 리덕스 관련 코드를 Ducks 패턴으로 작성한 모듈

        auth.js // 로그인, 회원가입

        loading.js // 로딩

        root.js // 여러 리듀서, 여러 Saga를 하나로 합침.

        user.js // 사용자의 상태를 담는 리덕스 모듈
    
    pages // 라우트 컴포넌트
        
        LoginPage.js // 로그인 

        PostListPage.js // 포스트 목록

        PostPage.js // 특정 포스트 읽기

        RegisterPage.js // 회원가입 

        WritePage.js // 글쓰기


### 작업 환경 준비

1. 설정 파일 작성 

    .prettierrc, jsconfig.json, 

2. 라우터 적용

    $ yarn add react-router-dom

    다섯개의 페이지 작성 / src/pages 디렉토리에 라우트 컴포넌트 작성 

    path={['/@:username', '/'] path에 배열을 넣어주면 한 라우트 컴포넌트에서 여러 개의 경로를 설정 가능. 

    '/@:username': localhost:3000/@kang 같은 경로에서 kang을 username 파라미터로 읽을 수 있음.

3. 스타일 설정

    $ yarn add styled-components // styled-components 사용

4. Button 컴포넌트

    Button 컴포넌트 작성 및 글로벌 스타일 수정(index.css)

5. 리덕스 적용

    필요한 라이브러리 설치

    $ yarn add redux react-redux redux-actions immer redux-devtools-extension

    src/modules/auth.js 파일 작성 : 리덕스 모듈 (Duck 패턴: 작성 액션 타입 + 액션 생성 함수 + 리듀서)

    모듈 파일 작성, 루트 리듀서, index.js에서 스토어 생성, Provider 적용

### 회원가입, 로그인 구현

src/components/auth 디렉토리에 회원 인증에 관련된 컴포넌트 작성

1. UI 준비

    AuthForm, AuthFormTemplate 컴포넌트 작성

    [Snippet](https://snippet-generator.app/) ${TM_FILENAME_BASE}: 확장자를 제외한 파일 이름

    파일 > 기본 설정 > 사용자 코드 조각 > javascriptreact > Snippet 저장 

    .'js'에 대한 파일 연결 구성 > JavascriptReact

    HTML5 iput 태그 authComplete 속성 : Form을 자동으로 입력해주는 기능으로 name 속성을 기준으로 작동함.

2. AuthTemplate 완성

3. AuthForm 완성

    AuthForm 컴포넌트에서 Button 컴포넌트 작성 시 

    ```
        <Button cyan fullWidth style={{ marginTop: '1rem' }}>로그인</Button>
    ```
    
    Button 컴포넌트에 cyan, fuillWidth, sytle props를 전달 > 다른 스타일이 적용됨.

    AuthForm에서 type props에 따라 다른 내용이 보이도록 수정.

4. 리덕스로 폼 상태관리

    회원가입과 로그인 폼의 상태를 관리하는 방법

    modules/auth 모듈 수정

    src/containers/LoginForm.js 작성 > 컨테이너 컴포넌트 작성 > 2개의 hook을 사용해 리덕스와 연동

    useDispatch: 컴포넌트 내부에서 dispatch를 사용하게 해주는 hook

    useSelector: connect 함수를 사용하지 않고도 리덕스의 상태 조회 가능

    pages/LoginPage 컴포넌트에서 기존 AuthForm을 컨테이너 컴포넌트인 LoginForm으로 수정

    LoginForm에서 props로 넣어주었던 값들을  components/auth/AuthForm 컴포넌트에서 사용하도록 수정

    위와 같은 방법으로 RegisterForm 컨테이너 컴포넌트를 작성하고 수정할 부분 수정

5. API 연동하기

    axios를 사용하여 API를 연동합니다. 그리도 리덕스에서 비동기 작업을 쉽게 작업하기 위해 redux-saga와

    이전에 사용했던 createRequestSage 유틸 함수를 이용함.

    $ yarn add axios redux-saga

    ● axios 인스턴스 생성

    ● 프록시 설정

    현재 백엔드 서버는 4000 포트, 리액트 개발 서버는 3000 포트로 열린 상태

    프록시는 웹팩 개발 서버에서 지원하는 기능으로 개발 서버로 요청하는 API들을 우리가 프록시로 정해 둔 백엔드 서버로 
    
    그대로 전달해 주고 그 응답을 웹 애플리케이션에서 사용할 수 있게 해줌.

    package.json 파일 수정

    ● 더 쉬운 요청 API 요청 상태 관리

    redux-sage를 통해 더 쉽게 API를 요청할 수 있도록 loading 리덕스 모듈과 createRequestSaga 유틸 함수 설정

6. 회원가입 구현

    ● auth 리덕스 모듈에서 API 적용, 각 API를 위한 사가 생성, 액션 생성 함수 리듀서 구현

    ● user 리덕스 모듈 작성 후 루트 리듀서에 포함, 회원 가입 성공 후 check를 호출하여 현재 사용자가 로그인 상태가 되었는지 확인

    ● withRouter를 사용해 history 객체에 접근하여 회원 가입 후 홈 화면으로 라우트 이동. Register 컴포넌트를 withRouter 컴포넌트로 감싸줌.

7. 로그인 구현

    LoginForm 회원가입 구현과 비슷하게 수정

8. 회원 인증 에러 처리

    check, 회원 인증 요청이 실패했을 경우 에러 메세지를 보여주는 UI 작업

    LoginForm 에서 에러 처리, useState를 사용하여 error 상태 처리, 인증 에러 발생 시 error 상태를 수정하고, error 값을 props로 전달

    RegisterForm 에서 에러처리

        ● username, password, passwordConfirm 중 하나라도 비어 있을 때 ( Array.includes('') 배열의 요소들이 공백 값을 가지고 있는지 확인)

        ● password와 passwordConfirm 값이 일치하지 않을 때

        ● username이 중복될 때 (authError.response.status === 409)

### 헤더 컴포넌트 생성 및 로그인 유지

    로그인 후에 새로고침을 해도 로그인이 유지되는 기능 구현.

1. 헤더 컴포넌트 만들기

    ● 반응형 디자인을 위한 Responsive 컴포넌트 작성

