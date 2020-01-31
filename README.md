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

            SubInfo.js // PostList와 PostViewer에서 공통으로 사용되는 컴포넌트

            Tags.js // PostList와 PostViewer에서 공통으로 사용되는 컴포넌트

            AskModal.js // 모달 컴포넌트, 이 프로젝트에서는 사용자의 요청을 한번 더 확인하기 위해 사용

        post
        
            PostViewer.js // 작성한 포스트를 읽는 페이지 UI

            PostActionButtons.js // 포스트 수정, 삭제 버튼을 보여주는 UI

        posts

            PostList.js // 포스트 목록을 보여주는 페이지 UI 컴포넌트

            Pagination.js // 페이지네이션 UI

        write

            Editor.js // 제목과 내용 입력, Quill 에디터 사용

            TagBox.js // 에디터 하단에 태그를 추가, 포스트 작성을 완료하거나 취소하는 버튼을 보여주는 컴포넌트

            WriteActionButton.js // 새로운 글 작성 버튼 UI

    containers // 리덕스와 연동을 위한 컴포넌트

        auth

            LoginForm.js // 로그인 컨테이너 컴포넌트

            RegisterFrom.js // 회원가입 컨테이너 컴포넌트

        common

            HeaderContainer.js // 헤더 컴포넌트에 리덕스 연동하는 컨테이너 컴포넌트

        post

            PostViewerContainer.js // PostViewer를 위한 컨테이너 컴포넌트, 포스트의 id 값을 가져와 readPost API 함수를 호출하고
                                    언마운트 시 unloadPost 함수를 호출해 리덕스 상태를 초기화

        posts 

            PostListContainer.js // PostList를 위한 컨테이너 컴포넌트, 리덕스 모듈과 연동 
                                    쿼리로부터 page, username, tag값을 얻어내고 액션 생성, PostList에 props 전달

            PaginationContainer.js // Pagination를 위한 컨테이너 컴포넌트

        write

            EditorContainer.js // title, body 값을 리덕스 스토어에서 불러와 Editor 컴포넌트에 전달 or 함수 전달

            TagBoxContainer.js // TagBox를 위한 컨테이너 컴포넌트

            WriteActionButtonsContainers.js // write 리덕스 모듈의 상태를 조회하고 포스트 작성 or 취소 시 할 작업에 대한 함수 작성

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

        write.js // 글쓰기 관련 상태를 관리하는 리덕스 모듈

        post.js // 작성된 글(포스트) 상태를 관리하는 리덕스 모듈, 조회, 단일 포스트 

        posts.js // 포스트 목록 상태를 관리하는 리덕스 모듈
    
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

3. 로그아웃 기능 구현

    로그아웃 API 작성 > user 모듈 LOGOUT 액션 생성, LOGOUT 액션 디스패치 시 로그아웃 API 호출과 localStorage user 삭제 , 리듀서 LOGOUT 추가하여 스터어 상태 변화 관리 > HeaderContainer 컴포넌트에서 logout 함수를 디스패치하는 onLogout 함수 작성 후 Header 컴포넌트에 전달 >
    Header 컴포넌트에서서 onLogout 함수를 로그아웃 버튼에서 호출하도록 설정

* * *
    
## 글쓰기 기능 구현

    글쓰기 페이지 기능을 구현하겠습니다. 글쓰기에 관련된 컴포넌트들은 write라는 이름으로 분류.

### 에디터 UI 구현

    $ yarn add quill // Quill 라이브러리 사용 - react rich text editor

    (https://quilljs.com/docs/modules/toolbar/)

### 에디터 하단 컴포넌트 UI 구현

    에디터 하단에 태그를 추가하는 컴포넌트와 포스트 작성을 완료하거나 취소하는 버튼을 보여주는 컴포넌트 작성

    1. TagBox

    태그를 추가하는 컴포넌트

    TagBox는 2가지 상황에서 렌더링을 합니다. input이 바뀔 때와 태그 목록이 바뀔 때... TagItem, TagList라는 두 컴포넌트로 분리하여 작성해 
    input 값이 바뀌어도 TagList 컴포넌트가 리렌더링되지 않습니다. 그리고 태그 목록에 변화가 있더라도 이미 렌더링 중인 TagItem들은 
    리렌더링되지 않고, 실제로 추가되거나 삭제되는 태그에만 영향을 줍니다.

    hooks를 사용하여 태그를 추가하고 제거하는 기능 구현

    ● WriteActionButton 컴포넌트

    포스트 작성 및 취소 두 개의 버튼을 만들고 onPublish, onCancel이라는 props를 받아와 사용

## 리덕스로 글쓰기 상태 관리

    write 모듈 작성 및 루트 리듀서에 연결

    1. EditorContainer 
    
    title, body 값을 리덕스 스토어에서 불러와 Editot 컴포넌트에 전달. 참고로 Quill 에디터는 일반 input, textarea가 아니기 때문에 onChange와 value 값을 사용해 상태 관리를 할 수 없다.

    2. TagBoxContainer

    TagBox를 위한 컨테이너 컴포넌트

    TagBox 컴포넌트에서 setLocalTags를 호출해야 하는 상황에서 onChangeTags도 함께 호출. 또 props로 받아 온 tags가 바뀔 때 setLocalTags를 호출.
    이로써 TagBox 컴포넌트 내부에서 상태가 바뀌면 리덕스 스토에도 반영되고, 리덕스 스토어에 있는 값이 바뀌게 되면 TagBox 컴포넌트 내부의 상태도 변화

    3. 글쓰기 API 연동

    포스트에 관련된 API를 요청하는 함수를 posts.js에 작성하고 이 함수를 호출하는 리덕스 액션과 사가를 작성(module/write) , 리덕스 모듈 수정 후 writeSaga를 rootSaga에 등록(modules/root)

    WriteActionBUttonsContainer 컴포넌트를 작성해 리덕스와 연동하고 WritePage 컴포넌트에서 기존의 WirteActionButton을 WriteActionBUttonsContainer 컴포넌트로 수정

    포스트 작성 후 등록 버튼 클릭 시 /@${user.username}/${_id} 로 페이지 이동이 되며 리덕스 개발자 도구에서 write/WRITE_POST_SUCCESS에서
    포스트 데이터가 확인 됨.

## 포스트 조회 기능 구현

    ● 하나의 포스트 읽기 기능

    ● 여러 포스트를 조회하는 포스트 목록 기능

### 포스트 읽기 페이지 구현

    1. PostViewer UI 준비

    포스트 제목, 태그, 작성자 명, 제목, 작성된 시간, 내용

    리액트에서 <div>{html}<div> 와 같이 HTML을 그대로 렌더링하는 형태로 JSX를 작성하면 HTML 태그가 적용되지 않고 
    일반 텍스트 형태로 나타남. 따라서 HTML을 적용하고 싶다면 dangerouslySetInnerHTML이라는 props 설정이 필요함.

    2. API 연동

    API를 연동하여 실제 데이터를 보여주도록 파일 수정, readPost 함수 추가(lib/api/posts)

    post 리덕스 모듈 작성 > 루트 리듀서, 루트 사가 등록

    PostViewer를 위한 컨테이너 컴포넌트 PostViewerContainer 컴포넌트 작성

    withRouter는 match 객체를 사용하기 위해서 불러 사용(URL 파라미터로 받아온 id 값 조회 필요)

### 포스트 목록 페이지 구현

    1. PostList UI 준비
    
    PostViewer 컴포넌트와 중복되는 SubInfo, Tags 컴포넌트를 common 디렉토리에 분리하여 사용

    계정명과 각 태그가 나타나는 부분에 Link를 사용하여 클릭 시 이동할 주소를 설정

    2. 포스트 목록 조회 API 연동

    PostList에서 실제 데이터를 보여 줄 수 있도록 API 연동.

    ListAPI는 username, page, tag 값을 쿼리 값으로 넣어서 사용함. qs 라이브러리를 사용하여 쿼리 값을 생성하겠습니다.

    이 라이브러리를 사용하면 쿼리 값을 더 편리하게 생성하고 JSON으로 변환할 수 있음.

    $ yarn add qs

    posts 리덕스 모듈 작성( 포스트 목록 상태 조회 ) > 루트 리듀서, 루트 사가 등록 > PostListContainer 컴포넌트 작성 >

    PostListpage에서 PostListContainer 컴포넌트 사용 > PostList 컴포넌트에서 받아 온 props로 결과물 출력

    3. HTML 필터링하기

    현재 posts 목록 출력 시 HTML 태그가 그대로 보임. 이 태그를 없애기 위해서 서버 쪽에서 태그를 없애는 작업 추가

    HTML을 제거하는 기능뿐만 아니라 특정 HTML만을 허용하는 기능이 있어 악성 스크립트 삽입을 막을 수 있다.

    백엔드 프로젝트에서 sanitize-html 라이브러리 설치

    $ yarn add sanitize-html // sanitize-html 라이브러리를 사용하여 HTML 필터링

    백엔드 프로젝트 posts.ctrl.js 수정

    list, write, update 3개의 함수 수정

    list 함수에서는 sanitizeHtml 함수를 사용하여 HTML을 제거하고 문자열의 길이를 제한하는 함수를 작성하고 적용

    write 함수에서는 HTML의 특정 태그와 특정 속성만을 허용하는 객체를 적용하여 HTML 필터링

    update 함수에서는 수정된 내용의 객체를 복사하여 sanitizeHtml 함수를 사용해 HTML 제거

    4. 페이지네이션 구현

    현재 listAPI를 만들 때 마지막 페이지 번호를 HTTP 헤더를 통해 클라이언트에 전달하도록 설정해둠.

    그러나 요청을 관리하는 사가를 쉽게 만들기 위해 작성한 createRequestSaga에서는 SUCCESS 액션을 발생시킬 때

    payload에 response.data 값만 넣어주기 때문에 현재 구조로는 헤더를 확인 불가 >> createRequestSaga, posts 모듈 수정 

    Pagination 컴포넌트 작성, Button 비활성화 스타일 추가

    PaginationContainer 컴포넌트 작성


    ● pagination 설정 방법

    백엔드 posts.ctrl.js 파일의 list 함수의 일부분을 수정해야한다. n은 한 페이지에 보일 포스트의 갯수

    .limit(n) // 한 번에 보이는 개수를 제한
    
    .skip((page - 1) * n) // 파라미터 개수 만큼 제외하고 다음 데이터부터 보여줌.

    ctx.set('Last-Page', Math.ceil(postCount / n)); // (전체 포스트의 갯수 / n) 의 결과값을 올림
    
    ● tag로 검색

    post의 특정 태그를 클릭하면 해당 태그로 검색을 한다. 

    location.search 함수를 사용하여 쿼리스트링에서 tag 값과 page 값을 얻어낸다.

    http://localhost:3000/?tag=22&page=2

    payload: {tag: "22", username: undefined, page: "2"}

    ● username으로 검색

    개정판에서 App 컴포넌트에서 라우트 설정을 아래와 같이 했다.
    
    <Route component={PostPage} path='/@:username/:postId' />

    '/@:username/:postId' 와 같은 문법을 사용하면 localhost:3000/@kang와 같은 경로에서 

    kang을 username의 파라미터로 읽어올 수 있다. 하지만 개정판의 PostListContainer, PaginationContainer 컴포넌트에서

    username을 location.search 함수로 읽어와 사용하게 되어있는데 username은 쿼리값이 아닌 파라미터값으로 읽어와야하기 때문에 

    정상적인 방법이 아닌듯 하다. 즉 username 값을 참조하기 위해서는 match 객체의 params 값으로부터 username 값을 읽어와야한다.

    여러 시도를 해보았지만 의도대로 되지않아 SubInfo 컴포넌트와 Pagination 컴포넌트의 일부분을 수정했다.

    SubInfo

    to 속성을 쿼리스트링으로 설정함.

    ```
        {/* <Link to={`/@${username}`}>{username}</Link> */}
        <Link to={`/?username=${username}`}>{username}</Link>
    ```

    Pagination

    ```
    const buildLink = ({ username, tag, page }) => {
        const query = qs.stringify({ tag, page });
        // return username ? `/@${username}?${query}` : `/?${query}`;
        // SubInfo 컴포넌트에서 Link의 to 속성을 username이 포함된 쿼리스트링으로 작성
        return username ? `/?username=${username}&${query}` : `/?${query}`;
    };
    ```

    이와 같이 설정하여 username 클릭 시 해당 user가 작성한 postList들만 확인이 가능하다.

## 수정 및 삭제 기능 구현, 마무리

### 포스트 수정

    포스트를 읽는 화면에서 포스트 작성자에게만 수정, 삭제 버튼이 나타나도록 렌더링 하겠습니다.

    PostActionButton 컴포넌트를 작성. 수정, 삭제 버튼 UI 컴포넌트

    이 컴포넌트는 PostViewer의 PostHead 하단에 보여주어야 합니다. 그런데 PostViewer에서 이 컴포넌트를 직접 렌더링할려면, PostViewe에서 사용하지 않는 이 컴포넌트의 props도 함께 PostViewer에 전달되어야 합니다.

    이러한 방법은 props가 많아지면 관리가 힘들기 때문에 props를 JSX 형태로 받아 와서 렌더링하는 방법을 사용하겠습니다. 

    ```
        actionButtons={<PostActionButtons/>} // 컴포넌트를 props로 전달
    ```

    ● 수정 버튼 클릭 시 글쓰기 페이지 이동

    수정 버튼 클릭 시 글쓰기 페이지로 이동하고, 현재 보고 있는가 나타나게 하겠습니다.

    write 리덕스 모듈에서 SET_ORIGINAL_POST 액션을 생성하고, 이 액션은 현재 보고 있는 포스트 정보를 write 모듈에서 관리하는 상태에 넣습니다.

    현재 사용자가 보고 있는 포스트가 자신이 작성한 포스트일 때만 수정, 삭제 버튼이 보이도록 ownPost 라는 props값을 
    
    PostViewerContainer에서 PostViewer에 전달해줍니다. 

    수정 버튼 클릭 시 제목, 태그 만 자동으로 입력되고 내용은 공백으로 나타납니다.

    내용의 초깃값도 설정되도록 Editor 컴포넌트를 수정

    
    ```
    const mounted = useRef(false); 
    useEffect(()=>{
        if(mounted.current) return; // mounted.current 값이 false일 때만 실행 됨.
        mounted.current = true;
        quillInstance.current.root.innerHTML = body;
    }, [body])
    ```

    Editor 컴포넌트에서 받아 오는 body값은 Quill 에디터에서 내용을 입력할 때마다 변경됩니다.

    body가 변경될 때마다 방금 작성한 useEffect에 등록한 함수가 호출됩니다. 하지만 우리는 컴포넌트가 화면에 마운트되고 (수정 버튼을 누르고 기존의 내용들이 렌더링될 때)

    단 한 번만 useEffect에 등록한 작업이 실행되도록 설정해주어야 하므로 useRef를 사용하여 mount 상태에 따라 작업을 처리하겠습니다.

    ( useref를 통해 만든 객체 안의 current 값은 실제 엘리먼트 값입니다. )

    ● 포스트 작성 API 대신 수정 API 사용

    api/posts.js에 updatePost 함수 작성 > write 리덕스 모듈에서 UPDATE_POST 액션과 updatePostSaga 작성 >

    WriteActionButtonsContainer 컴포넌트에서 수정 버튼 클릭 시 설정되는 originalPostId 값을 사용하는 작업 코드 작성 >

    WriteActionButton 컴포넌트에서 isEdit(originalPostId 존재 여부) 값에 따라 서로 다른 문구 출력

### 포스트 삭제

    삭제 버튼 클릭 시 사용자의 확인을 한번 더 요청하기 위해 모달창을 보여주는 방식으로 삭제 기능을 구현하겠습니다.

    common/AskModal 컴포넌트 작성

### react-helmet-asyncd로 meta 태그 설정

    구글, 네이버 같은 검색 엔진은 웹 페이지를 수집할 때 meta 태그를 읽습니다. 이 meta 태그를 리액트 앱에서

    설정하는 방법입니다.

    $ yarn add react-helmet-async // 라이브러리 설치

    src/index.js 에서 HelmetProvier 컴포넌트로 App 컴포넌트를 감싸줍니다. 
    
    > meta 태그를 설정 하고 싶은 곳에 Helmet 컴포넌트 사용

    react-helemt-async에서는 더 깊숙한 곳에 위치한 Helmet이 우선권을 차지함.

    ```
    import { Helmet } from 'react-helmet-async';

    <Helmet>
        <title>...</title>
    </Helmet>
    ```


