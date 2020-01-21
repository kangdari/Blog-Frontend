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

