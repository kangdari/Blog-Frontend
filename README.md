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



