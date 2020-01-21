## Blog-Fronted

리액트 프로젝트를 생성하여 Koa 프레임워크로 만든 서버에 연동하여 작업.

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

## 회원가입, 로그인 구현

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

    redux-sage를 통해 더 쉽게 API를 요청할 수 있도록 loadin 리덕스 모듈과 createRequestSaga 유틸 함수 설정


