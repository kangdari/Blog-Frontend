import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom'; // URL 파라미터 match 객체를 사용하기 위해서 불러옴.
import { readPost, unloadPost } from '../../modules/post';
import PostViewer from '../../components/post/PostViewer';
import PostActionButtons from '../../components/post/PostActionButtons';
import { setOriginalPost } from '../../modules/write';

const PostViewerContainer = ({ match, history }) => {
    const dispatch = useDispatch();
    // 처음 마운트될 때 포스트 읽기 API 요청
    const { postId } = match.params;
    // post, loading 모듈
    const { post, error, loading, user } = useSelector(({ post, loading, user }) => ({
        post: post.post,
        error: post.error,
        loading: loading['post/READ_POST'], // ???
        user: user.user
    }));

    useEffect(() => {
        // API 함수 호출
        dispatch(readPost(postId));
        // 언마운트될 때 리덕스에서 포스트 데이터 없애기
        return () => {
            dispatch(unloadPost());
        };
    }, [dispatch, postId]);

    const onEdit = () => {
        dispatch(setOriginalPost(post));
        history.push('/write'); // write 페이지 이동
    };

    return (
        <PostViewer
            post={post}
            loading={loading}
            error={error}
            actionButtons={<PostActionButtons onEdit={onEdit} />} // 컴포넌트를 props로 전달
            // 현재 사용자가 보고 있는 포스트가 자신의 포스트 인지 체크 
            ownPost = {user && post && user._id === post.user._id} 
        />
    );
};

export default withRouter(PostViewerContainer);
