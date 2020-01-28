import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom'; // URL 파라미터 match 객체를 사용하기 위해서 불러옴.
import { readPost, unloadPost } from '../../modules/post';
import PostViewer from '../../components/post/PostViewer';

const PostViewerContainer = ({ match }) => {
    const dispatch = useDispatch();
    // 처음 마운트될 때 포스트 읽기 API 요청
    const { postId } = match.params;
    // post, loading 모듈
    const { post, error, loading } = useSelector(({ post, loading }) => ({
        post: post.post,
        error: post.error,
        loading: loading['post/READ_POST'], // ???
    }));

    useEffect(()=>{
        // API 함수 호출
        dispatch(readPost(postId));
        // 언마운트될 때 리덕스에서 포스트 데이터 없애기
        return () => {
            dispatch(unloadPost())
        }
    }, [dispatch, postId])

    return <PostViewer post={post} loading={loading} error={error} />;
};

export default withRouter(PostViewerContainer);
