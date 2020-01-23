## Blog-Fronted

리액트 프로젝트를 생성하여 Koa 프레임워크로 만든 서버에 연동하여 작업.

### 디렉토리 정리

● src

    components

        auth

            AuthForm.js // 회원가입 or 로그인 form 을 보여줌.

            AuthTemplate.js // 회원가입 or 로그인 레이아웃 담당

        common    

            Button.js // 공통으로 사용되는 Button UI

            Responsive.js // 반응형 디자인을 위한 컴포넌트로 다양한 컴포넌트에서 사용 예정

            Header.js // 포스트, 포스트 목록 페이지 상단에 위치한 컴포넌트

    containers // 리덕스와 연동을 위한 컴포넌트

        auth

            LoginForm.js // 로그인 컨테이너 컴포넌트

            RegisterFrom.js // 회원가입 컨테이너 컴포넌트

        common

            HeaderContainer.js // 헤더 컴포넌트에 리덕스 연동하는 컨테이너 컴포넌트

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

    ● Header 컴포넌트 작성, PostListPage에서 렌더링

    ● 로그인 버튼을 누르면 /login 페이지로 이동 시키기. Link 컴포넌트를 사용하는 방법

        Button 컴포넌트 내부에서 props.to 값에 따라 StyledLink, StyledButton 사용할지 결정됨.

        Header 컴포넌트에서 사용한 Button 컴포넌트는 to 속성이 존재하므로 StyledLink를 사용함.

        StyledLink를 사용하는 과정에서 props.cyan 값을 숫자 1, 0 으로 변환 해줌.

        이는 styled() 함수로 감싸서 만든 컴포넌트의 경우 임의 props가 자동으로 필터링되지 않기 때문..

        Link에서 사용하는 a 태그에 boolean의 값이 임의 props로 설정되는 것을 허용 x 

        숫자 / 문자열만 허용하기 때문에 숫자형으로 변환해줌
        
        AuthForm 컴포넌트에서 사용한 Button 컴포넌트는 to 속성이 없으므로 StyledButton 사용

2. 로그인 상태 보여주고 유지

    ● 로그인 상태 보여주기
    
    헤더 컴포넌트에 리덕스 연결. HeaderContainer 컴포넌트 작성

    ● 로그인 상태 유지

    브라우저의 localStorage 사용, 회원가입 및 로그인 시 사용자 정보를 localStorage에 저장

    새로고침 시 로그인 상태를 유지하려면 리액트 앱이 브라우저에서 맨 처음 렌더링 될 때 localStorage에서 값을 불러와 
    리덕스 스토어 안에 넣도록 구현해야함.

    이 작업은 App 컴포넌트에서 useEffect를 사용하여 처리하거나, App 컴포넌트를 클래스형 컴포넌트로 변환하여 componentDidMount 메서드를 사용하여 처리해야합니다. 하지만 useEffect와 componenetDidMount는 컴포넌트가 한 번 렌더링된 이후에 실행되기 때문에 아주 짧은 깜박임 현상이 있을 수 있습니다.

    엔트리 파일인 index.js에서 사용자 정보를 불러오도록 처리하고 컴포넌트를 렌더링하면 깜박임 현상이 발생하지 않습니다.

    ● 로그인 검증 실패 시 정보 초기화

    로그인 정보 만료되었을 때를 대비하여 사용자 정보를 초기화하는 작업

    user 모듈에서 checkFailureSaga() 함수를 만들어서 CHECK_FAILURE 액션이 발생했을 때 이 함수를 호출하여 localStorage의
    user값을 초기화.

    